const db = require("../database/connect");

class Card {
  constructor({ card_id, deck_id, question, answer, image }) {
    this.id = card_id;
    this.deck_id = deck_id;
    this.question = question;
    this.answer = answer;
    this.image = image;
  }

  static async getAll(deckId) {
    const response = await db.query("SELECT * FROM cards WHERE deck_id = $1;", [
      deckId,
    ]);
    return response.rows.map((c) => new Card(c));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM cards WHERE card_id = $1;", [
      id,
    ]);
    if (response.rows.length !== 1) {
      throw new Error("Unable to locate card.");
    }
    return new Card(response.rows[0]);
  }

  static async create(data) {
    const { deck_id, question, answer, image } = data;
    const response = await db.query(
      "INSERT INTO cards (deck_id, question, answer, image) VALUES ($1, $2, $3, $4) RETURNING *;",
      [deck_id, question, answer, image]
    );
    return new Card(response.rows[0]);
  }

  async destroy() {
    try {
      const response = await db.query("DELETE FROM cards WHERE card_id = $1;", [
        this.id,
      ]);

      return { deleted: response.rowCount > 0 };
    } catch (err) {
      console.error("Error during database query:", err);
      throw new Error("Failed to delete the card.");
    }
  }

  async update(data) {
    const { question, answer, image } = data;
    const response = await db.query(
      "UPDATE cards SET question = $1, answer = $2, image = $3 WHERE card_id = $4 RETURNING *;",
      [question, answer, image, this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error("Card not found.");
    }
    return new Card(response.rows[0]);
  }
}

module.exports = Card;
