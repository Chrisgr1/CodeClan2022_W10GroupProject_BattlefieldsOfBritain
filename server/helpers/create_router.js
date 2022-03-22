import express from 'express';
import { ObjectID  } from 'mongodb';

const createRouter = function (collection) {

    const router = express.Router();
  
    router.get('/', (req, res) => {
      collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
    });
  
    router.get('/:id', (req, res) => {
      const id = req.params.id;
      collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
    });
  
    // Newer version of Mongodb put request - doesnt give back ops object anymore
    router.post('/', (req, res) => {
      const newData = req.body;
      collection
      .insertOne(newData)
      .then((result) => {
        return collection.findOne({ _id: result.insertedId })
      })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
    });
  
    router.delete('/:id', (req, res) => {
      const id = req.params.id;
      collection
      .deleteOne({ _id: ObjectID(id) })
      .then(result => {
        res.json(result)
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
    });
  
    router.put('/:id', (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      collection
      .updateOne(
        { _id: ObjectID(id)},
        { $set: updatedData }
      )
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
    })
  
    return router;
  
  };
  
  export default createRouter;