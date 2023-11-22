import { getUserInfo } from '@/app/util/apiCallers/Google';


const pool = require('../../util/dbConnector');
//const token = sessionStorage.getItem("access_token");


export async function getMonthlyData(token) {
    const client = await pool.connect();

    const userid = await getUserInfo(token)
    console.log("userid ", userid)

    try {
        const query = `
        WITH monthly_totals AS (
            SELECT 
                DATE_TRUNC('month', e_time) AS truncated_month,
                TO_CHAR(DATE_TRUNC('month', e_time), 'Mon') AS month, 
                SUM(amount_debited)::float AS amount 
            FROM 
                b64decoded_responses 
            WHERE 
                user_id = $1 AND
                to_account != 'None'
            GROUP BY 
                DATE_TRUNC('month', e_time)
        )
        SELECT 
            month, 
            amount 
        FROM 
            monthly_totals 
        ORDER BY 
            truncated_month;
        `;
        const params = [userid.id];

        const res = await client.query(query,params);
        return res.rows; // Returns an array of monthly data
    } catch (err) {
        console.log(err)
        console.error("error from the db ",err);
        return []; // Return an empty array in case of an error
    } finally {
        client.release(); // Make sure to release the client back to the pool
    }
}

export async function getVpaData(token,month) {
    const client = await pool.connect();
    console.log("current month data requested for : ",month)

    const userid = await getUserInfo(token)

    try {
        const query = `
        WITH cte AS (
            SELECT
                to_account AS vpa,
                SUM(amount_debited):: float AS totalamount,
                TO_CHAR(DATE_TRUNC('month', e_time), 'Mon') AS month,
                COUNT(*):: float AS totaltxn,
                user_id as userId
            FROM
                b64decoded_responses
            GROUP BY
                to_account,
                DATE_TRUNC('month', e_time),
                user_id
        )
        SELECT
            a.vpa,
            a.totalamount,
            a.totaltxn,
            b.label
        FROM
            cte a
            LEFT JOIN vpa_label_pocket_dbos b ON a.vpa = b.vpa
        WHERE
            b.label IS NOT NULL
            AND a.month = $2
            AND a.userId = $1
            AND a.vpa != 'None'

        ORDER BY
            a.totaltxn DESC;
        `;
        
        const params = [userid.id,month];

        const res = await client.query(query,params);
        return res.rows; // Returns an array of monthly data
        console.log("getVpaData data ->",res.rows)

    } catch (err) {
        console.log(err)
        console.error("error from the db ",err);
        return []; // Return an empty array in case of an error
    } finally {
        client.release(); // Make sure to release the client back to the pool
    }
}

export async function getNonLabeledVpaData(token,month) {
    const client = await pool.connect();
    console.log("current month data requested for : ",month)

    const userid = await getUserInfo(token)

    try {
        const query = `
        WITH cte AS (
            SELECT
                to_account AS vpa,
                SUM(amount_debited):: float AS totalamount,
                TO_CHAR(DATE_TRUNC('month', e_time), 'Mon') AS month,
                COUNT(*):: float AS totaltxn,
                user_id as userId
            FROM
                b64decoded_responses
            GROUP BY
                to_account,
                DATE_TRUNC('month', e_time),
                user_id
        )
        SELECT
            a.vpa,
            a.totalamount,
            a.totaltxn,
            b.label
        FROM
            cte a
            LEFT JOIN vpa_label_pocket_dbos b ON a.vpa = b.vpa
        WHERE
            b.label IS NULL
            AND a.month = $2
            AND a.userId = $1
            AND a.vpa != 'None'

        ORDER BY
            a.totaltxn DESC;
        `;
        
        const params = [userid.id,month];

        const res = await client.query(query,params);
        return res.rows; // Returns an array of monthly data
        console.log("getVpaData data ->",res.rows)

    } catch (err) {
        console.log(err)
        console.error("error from the db ",err);
        return []; // Return an empty array in case of an error
    } finally {
        client.release(); // Make sure to release the client back to the pool
    }
}