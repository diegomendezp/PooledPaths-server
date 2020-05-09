module.exports.create = (Model) => (req, res, next) => {
  new Model(req.body)
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

// populateFields must be a String array with the fields to populate
module.exports.getAll = (Model, populateFields = []) => (req, res, next) => {
  const { ...search } = req.query;
  Model.find(search).populate(populateFields)
    .then((data) => res.json(data))
    .catch(next);

};

module.exports.getOne = (Model, populateFields = []) => (req, res, next) => {
  const { id } = req.params;
  Model.findOne({ _id: id })
    .populate(populateFields)
    .then((data) => res.json(data))
    .catch(next);
};

module.exports.updateOne = (Model, schemaValidation, body) => (
  req,
  res,
  next
) => {
  const newData = body || req.body;
  const { id } = req.params;
  Model.findOneAndUpdate({ _id: id }, newData, { new: true })
    .then((data) => res.json(data))
    .catch(next);

};

module.exports.deleteOne = (Model) => (req, res, next) => {
  const { id } = req.params;
  Model.findOneAndRemove({ _id: id })
    .then(() => res.json({ message: 'Removed succesfully' }))
    .catch(next);
};