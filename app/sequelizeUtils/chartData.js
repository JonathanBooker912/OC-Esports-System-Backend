import db from "../models/index.js";
const MatchParticipant = db.matchParticipant;
const PlayerData = db.playerData;
const Match = db.match;

const exports = {};

exports.findAllDataForPlayer = async (aliasId, metricId) => {
  const processedData = []
  const playerData = await MatchParticipant.findAll({
    where: {
      aliasId: aliasId
    },
    include: [
      {
        model: PlayerData,
        where: {
          metricId: metricId
        }
      },
      {
        model: Match,
        as: "match",
        attributes: ["matchDate"]
      }
    ]
  });

  playerData.forEach((player) => {
    player.participant
  })

};



export default exports;
