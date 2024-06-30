"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDataSchema, getQueryData, getTableData } from "../apiCallers/Charts";
import { useEffect } from "react";
// Replace with your actual API key (store securely)
const API_KEY = "";

export async function getGeminiContent() {
  // Function declaration, to pass to the model.
  const listDatasetsFunc = {
    name: "list_datasets",
    description:
      "Retrieves a list of available table or tables if you need to join the table to get the data, from the connected database that are relevant to the user's query.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "The user's original query or a refined version indicating the data they seek.",
        },
      },
    },
  };


  const getTableFunc = {
    name: "get_table",
    parameters: {
      type: "object",
      description:
        "Get information about a table(s) including the description, schema, and number of rows that will help answer the user's question. Always use the fully qualified table names.",
      properties: {
        table: {
          type: "string",
          description:
            "Name of table to get information about",
        },
      },
      required: ["table"],
    },
  };

  const sqlQueryFunc = {
    name: "sql_query",
    parameters: {
      type: "object",
      description: "Get information from data in Postgres using SQL queries",
      properties: {
        sqlquery: {
          type: "string",
          description:
            " SQL query on a single line (use common table expression to form a complex query and also Check for other table to include with join when eever neccessary) that will help give quantitative answers to the user's question when run on a Postgres given that  e_time is in the format of '2023-11-14 22:48:53+05:30'. Ask for information if needed. ",
        },
      },
      required: ["sqlquery"],
    },
  };


  // Executable function code. Put it in a map keyed by the function name
  // so that you can call it once you get the name string from the model.
  const functions = {
    controlLight: ({ brightness, colorTemp }) => {
      return setLightValues(brightness, colorTemp);
    },
    list_datasets: async () => {
      // const d = await getDataSchema()
      return {
        content : 
        [{
          db_name : "users" ,
          description : "deatils about user"
        },
        {
          db_name : "vpa_label_pocket_dbos" ,
          description : "This table stores the data of to_account with the user label and caterogry as pockets, use it when user talks of category of transactions"
        },
        {
          db_name : "b64decoded_responses" ,
          description : "this table contains transactions of all users in a time series format"
        },

      ]
      
      }
    },
    get_table : async(table_name) => {
      console.log("table name :", table_name)
      const d =  await getTableData(table_name.table)
      return {
        table : d
      }
    },
    sql_query : async(e) =>  {
      const g = e.sqlquery.replace(/\\/g, '');  
      console.log("SQL :", g)
      const d = getQueryData(g)
        return d
    }

    
  };

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generativeModel = genAI.getGenerativeModel({
    // Use a model that supports function calling, like a Gemini 1.5 model
    model: "gemini-1.5-flash",

    // Specify the function declaration.
    tools: {
      functionDeclarations: [listDatasetsFunc,getTableFunc,sqlQueryFunc],
    },
  });

  const chat = generativeModel.startChat();
  const prompt = `Get me the breakdown of total money in each pocket of last month,
  Please give a concise, high-level summary followed by detail in
  plain language about where the information in your response is
  coming from in the database. Only use information that you learn
  from postgres db, do not make up information.`;

  // console.log("query - " ,  prompt )
  // const prompt = "fetch the top accounts where i spent the most this month";

  useEffect(() => {
    return async () => {
      // Send the message to the model.
      var result = await chat.sendMessage(prompt);

      // For simplicity, this uses the first function call found.
   

      var function_calling_in_process = true;
      while (function_calling_in_process) {
        try {
          const call = result.response.functionCalls()[0];
          console.log(call);
          const apiResponse = await functions[call.name](call.args);
          console.log("api response :", apiResponse);
          result = await chat.sendMessage([
            {
              functionResponse: {
                name: call.name,
                response: {
                  content : apiResponse
                },
              },
            },
          ]);

          // Log the text response.
          console.log(result);

        } catch (error) {
          function_calling_in_process = false;
        }
      }
      console.log(result.response.text());

    };
  }, []);
}
