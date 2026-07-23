const db = require('../../config/database');
const roomsTable = require('../../schema/rooms');
const { eq } = require('drizzle-orm');
const { getIO } = require('../socket');

exports.receiveRoomStatus = async (req, res) => {
  try {
    const secret = req.header('X-Webhook-Secret');
    if (!secret || secret !== process.env.WEBHOOK_SHARED_SECRET) {
      return res.status(401).json({ error: 'Secret webhook invalide' });
    }

    const { numero, statut, motifBlocage } = req.body || {};

    if (!numero || !statut) {
      return res.status(400).json({ error: 'Payload invalide' });
    }

    const existingRooms = await db
      .select({ id: roomsTable.id, roomNumber: roomsTable.roomNumber })
      .from(roomsTable)
      .where(eq(roomsTable.roomNumber, numero))
      .limit(1);

    if (existingRooms.length > 0) {
      await db
        .update(roomsTable)
        .set({
          housekeepingStatus: statut,
          blockReason: statut === 'bloquee' ? motifBlocage || null : null,
          updatedAt: new Date()
        })
        .where(eq(roomsTable.roomNumber, numero));
    } else {
      console.warn(`Webhook room-status: chambre ${numero} introuvable localement`);
    }

    getIO().emit('room:status-updated', {
      numero,
      statut,
      motifBlocage: statut === 'bloquee' ? motifBlocage || null : null
    });

    res.status(200).json({ message: 'Statut de chambre mis à jour' });
  } catch (err) {
    console.error('ERREUR WEBHOOK ROOM STATUS:', err.stack);
    res.status(500).json({ error: err.message });
  }
};
