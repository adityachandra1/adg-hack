const Request = require('../models/Request');
const { sendEmailNotif_Text } = require('../utils/mailer');

sendMail = async (req, res, next) => { 
  try {
    const { email } = req.body;
    const subject = 'Request for Resource';
    const text = 'Your request has been recieved';
    const response = sendEmailNotif_Text(email, subject, text);
    res.status(200).json({status: "Success", message: "Email Sent"})
  } catch (err) {
    res.status(400).json({ status: "Error", err });
  }
}

createRequest = async (req, res, next) => {
  try {
    const { requester, resourceType, requestContent } = req.body;
    const request = new Request({
      requester,
      resourceType,
      requestContent,
    });
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    next(error);
  }
};

// READ all requests
getAllRequests = async (req, res, next) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// READ a single request
getRequestById = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

// UPDATE a request
updateRequest = async (req, res, next) => {
  try {
    const { requester, resourceType, requestContent, status, approvedBy } = req.body;
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    request.requester = requester;
    request.resourceType = resourceType;
    request.requestContent = requestContent;
    request.status = status;
    request.approvedBy = approvedBy;
    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
};

// DELETE a request
deleteRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    await request.remove();
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest, sendMail};
