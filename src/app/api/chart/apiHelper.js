import { getUserInfo } from "@/app/util/apiCallers/Google";

const pool = require("../../util/dbConnector");
//const token = sessionStorage.getItem("access_token");

export async function getMonthlyData(token) {
  const client = await pool.connect();

  const userid = await getUserInfo(token);
  console.log("userid ", userid);
  //this query will be applicable only for the two banks now for dynamic banks we can use the Pivot cmd 
  //or add new bank case 
  try {
    const query = `
    WITH monthly_totals AS (
      SELECT
        DATE_TRUNC('month', e_time) AS truncated_month,
        TO_CHAR(DATE_TRUNC('month', e_time), 'YYYY-Mon') AS date_str,
        SUM(CASE WHEN bank = 'SBI' THEN amount_debited ELSE 0 END)::float AS sbi_amount,
        SUM(CASE WHEN bank = 'HDFC' THEN amount_debited ELSE 0 END)::float AS hdfc_amount
      FROM b64decoded_responses
      WHERE user_id = $1 AND to_account != 'None'
      GROUP BY DATE_TRUNC('month', e_time)
    )
    SELECT
      date_str AS "Date",
      sbi_amount AS "SBI",
      hdfc_amount AS "HDFC"
    FROM monthly_totals
    ORDER BY truncated_month
        `;
    const params = [userid.id];

    const res = await client.query(query, params);
    return res.rows; // Returns an array of monthly data
  } catch (err) {
    console.log(err);
    console.error("error from the db ", err);
    return []; // Return an empty array in case of an error
  } finally {
    client.release(); // Make sure to release the client back to the pool
  }
}

export async function getVpaData(token, month,bank) {
  const client = await pool.connect();
  console.log("current month data requested for : ", month,bank);

  const userid = await getUserInfo(token);

  try {
    const query = `
    
 WITH cte AS (
  SELECT
    to_account AS vpa,
    SUM(amount_debited):: float AS totalamount,
    TO_CHAR(DATE_TRUNC('month', e_time), 'YYYY-Mon') AS month,
    COUNT(*):: float AS totaltxn,
    user_id as userId,
    bank as bank
  FROM
    b64decoded_responses
  GROUP BY
    to_account,
    DATE_TRUNC('month', e_time),
    user_id,
    bank
    
)
SELECT
  a.vpa,
  a.totalamount,
  a.totaltxn,
  b.label,
  b.pocket,
  a.bank
FROM
  cte a
LEFT JOIN vpa_label_pocket_dbos b ON a.vpa = b.vpa
WHERE
  b.label IS NOT NULL
  AND a.month = TO_CHAR(TO_DATE($2, 'YYYY-Mon'), 'YYYY-Mon')
  AND a.userId = $1
  AND a.vpa != 'None'
ORDER BY
  a.totaltxn DESC;`

    const params = [userid.id, month];

    const res = await client.query(query, params);
    return res.rows; // Returns an array of monthly data
    console.log("getVpaData data ->", res.rows);
  } catch (err) {
    console.log(err);
    console.error("error from the db ", err);
    return []; // Return an empty array in case of an error
  } finally {
    client.release(); // Make sure to release the client back to the pool
  }
}

export async function getNonLabeledVpaData(token, month,bank) {
  const client = await pool.connect();

  const userid = await getUserInfo(token);

  try {
    const query = `
        WITH cte AS (
            SELECT
                to_account AS vpa,
                SUM(amount_debited):: float AS totalamount,
                TO_CHAR(DATE_TRUNC('month', e_time), 'YYYY-Mon') AS month,
                COUNT(*):: float AS totaltxn,
                user_id as userId
            FROM
                b64decoded_responses
                WHERE bank = $3

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
            AND a.month = TO_CHAR(TO_DATE($2, 'YYYY-Mon'), 'YYYY-Mon')
            AND a.userId = $1
            AND a.vpa != 'None'

        ORDER BY
            a.totaltxn DESC;
        `;

    const params = [userid.id, month,bank];

    const res = await client.query(query, params);
    return res.rows; // Returns an array of monthly data
    console.log("Non label vpa data ->", res.rows);
  } catch (err) {
    console.log(err);
    console.error("error from the db ", err);
    return []; // Return an empty array in case of an error
  } finally {
    client.release(); // Make sure to release the client back to the pool
  }
}

export async function getUniqueVpa(token) {
  const client = await pool.connect();

  const userid = await getUserInfo(token);

  try {
    const query = `
        select Distinct(LABEL) from vpa_label_pocket_dbos  where user_id = $1 order by label 
        `;

    const params = [userid.id];

    const res = await client.query(query, params);
    return res.rows; // Returns an array of monthly data
    console.log("getVpaData data ->", res.rows);
  } catch (err) {
    console.log(err);
    console.error("error from the db ", err);
    return []; // Return an empty array in case of an error
  } finally {
    client.release(); // Make sure to release the client back to the pool
  }
}

export async function getRecentTransaction(token, month) {
  const client = await pool.connect();

  const userid = await getUserInfo(token);

  try {
    const query = `
    with cte as (
      select
          transaction_id as key,
          user_id as userid,
          to_account as vpa,
          amount_debited as amount,
          bank as bank,
          e_time as duration,
          TO_CHAR(DATE_TRUNC('month', e_time), 'YYYY-Mon') AS month
      from
          b64decoded_responses
  )
SELECT
  a.key,
  a.vpa,
  a.amount,
  a.duration,
  a.bank,
  b.label,
  b.pocket
FROM
  cte a
  LEFT JOIN vpa_label_pocket_dbos b ON a.vpa = b.vpa
WHERE
  a.month = TO_CHAR(TO_DATE($2, 'YYYY-Mon'), 'YYYY-Mon')
  AND a.userid = $1
  AND a.vpa != 'None'
ORDER BY
  a.duration DESC 
        `;

    const params = [userid.id, month];

    const res = await client.query(query, params);
    return res.rows; // Returns an array of monthly data
    console.log("getVpaData data ->", res.rows);
  } catch (err) {
    console.log(err);
    console.error("error from the db ", err);
    return []; // Return an empty array in case of an error
  } finally {
    client.release(); // Make sure to release the client back to the pool
  }
}



export async function listSchemas() {
  const client = await pool.connect();

  try {
        const result = await client.query(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public';
        `);
        return result.rows.map(row => row.table_name);
      } catch (error) {
        console.error('Error fetching tables:', error);
        return [];
      }
}

export async function getTableData( tableName) {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = $1;
    `,
      [tableName]
    );
    client.release();
    return result.rows; 
  } catch (error) {
    console.error("Error fetching table schema:", error);
    throw error; // Or handle the error as needed
  }
}


export async function getQueryData( query) {
  try {
    const client = await pool.connect();
    const result = await client.query(
     query
    );
    client.release();
    return result.rows; 
  } catch (error) {
    console.error("Error fetching table schema:", error);
    throw error; // Or handle the error as needed
  }
}