const db = require('../config/db');

const getSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const query = `
        SELECT 
            *,
            (
                6371 * acos(
                    cos(radians(?)) * 
                    cos(radians(latitude)) * 
                    cos(radians(longitude) - radians(?)) + 
                    sin(radians(?)) * 
                    sin(radians(latitude))
                )
            ) AS distance
        FROM schools
        HAVING distance < 50
        ORDER BY distance
    `;

    new Promise((resolve, reject) => {
        db.execute(query, [latitude, longitude, latitude], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error('Error in getSchools:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};

const addSchool = (req, res) => {
    console.log('Received request for addSchool');
    
    // Destructure the request body
    const { name, address, latitude, longitude } = req.body;
    console.log('Request body:', { name, address, latitude, longitude });

    // Validation
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate latitude and longitude
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
    }

    if (latitude < -90 || latitude > 90) {
        return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
    }

    if (longitude < -180 || longitude > 180) {
        return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    console.log('Executing query with parameters:', [name, address, latitude, longitude]);

    
    db.promise().query(query, [name, address, latitude, longitude])
        .then(result => {
            console.log('Insert result:', result);

            res.status(201).json({
                message: 'School added successfully',
                schoolId: result.insertId
            });
        })
        .catch(error => {
            console.error('Error in addSchool:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};



module.exports = {
    getSchools,
    addSchool
};

