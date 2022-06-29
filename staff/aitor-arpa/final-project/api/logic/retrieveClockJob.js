const { NotFoundError } = require("errors");
const { User, Clock } = require("../models");
const { validateId } = require("validator");

function retrieveClockJob(userid, jobid) {
  validateId(userid);
  validateId(jobid);
  return User.findById(userid)
    .then((user) => {
      if (!user) throw new NotFoundError("User Not Found");
      return Clock.find({ job: jobid, user: userid });
    })
    .then((clock) => {
      if (!clock) throw new NotFoundError("Clock Not Found");
      if (clock <= 0) return [];

      return clock;
    });
}

module.exports = retrieveClockJob;
