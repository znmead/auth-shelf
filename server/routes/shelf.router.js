const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log('Adding new shelf item to DB');
  const queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                    VALUES ($1, $2, ${req.user.id});`;

  pool.query(queryText, [req.body.itemDescription, req.body.itemUrl]).then(() => {
    console.log('Item added to shelf successfully');
    res.sendStatus(201);
  }).catch(err => {
    console.log('Error in post', error);
    res.sendStatus(500);
  });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`Deleting shelf item ${req.item.id} from:`, req.user.id)
  const id = req.params.id;
  const query = `SELECT * FROM "item" 
  JOIN "user" ON "user"."id" = "user_id" 
  WHERE "user_id"=$1`;
  pool.query(query, [id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Getting all genres', err);
      res.sendStatus(500)
    })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
