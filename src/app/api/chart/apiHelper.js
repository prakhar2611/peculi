

const pool = require('../../util/dbConnector');
//const token = sessionStorage.getItem("access_token");


export async function getMonthlyData() {
    const client = await pool.connect();


    try {
        const query = `
            SELECT DATE_TRUNC('month', e_time) AS month, SUM(amount_debited) AS total_amount
            FROM b64decoded_responses
            GROUP BY DATE_TRUNC('month', e_time)
            ORDER BY month;
        `;
        //const params = [userId];

        const res = await client.query(query);
        console.log("data from the dat base ",res.rows)
        return res.rows; // Returns an array of monthly data
    } catch (err) {
        console.log(err)
        console.error("error from the db ",err);
        return []; // Return an empty array in case of an error
    } finally {
        client.release(); // Make sure to release the client back to the pool
    }
}