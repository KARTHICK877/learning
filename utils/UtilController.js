const responseCode = require("../Config/responseCode").returnCode;

module.exports = {
  // Sends a success response
  sendSuccess: async (req, res, next, data) => {
    if (module.exports.isEmpty(data.responseCode)) {
      data["responseCode"] = responseCode.validSession;  // Set default response code if not provided
    }
    res.status(200).send({
      message: "success",
      code: responseCode.success.code,
      data: data,
    });
  },

  // Sends an error response
  sendError: async (req, res, next, err) => {
    console.error(err);  // Logs the error for debugging purposes
    res.status(500).send({
      message: "failure",
      code: responseCode.serverError.code,
      data: err,
      
    });
  },

  // Utility function to check if data is empty
  isEmpty: (data) => {
    return (
      typeof data === "undefined" || 
      data === null || 
      data === "" || 
      (Array.isArray(data) && data.length === 0)
    );
  },
};
