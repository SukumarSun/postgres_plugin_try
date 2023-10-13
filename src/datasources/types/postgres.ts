import { GSContext, GSDataSource, PlainObject } from "@godspeedsystems/core";
import { Client, Pool, QueryResult } from 'pg';

export default class DataSource extends GSDataSource {
    public client: Pool;

    constructor(config: PlainObject) {
        super(config);
        this.client = new Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'sundar',
            password: 'Apple123',
            port: 5432,
        });
    }

    protected async initClient(): Promise<Pool> {
        try {
            // Initialize and connect the PostgreSQL client
            await this.client.connect();
            return this.client;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async execute(ctx: GSContext, args: PlainObject): Promise<any> {
        try {
            // Ensure the PostgreSQL client is initialized
            if (!this.client) {
                throw new Error('PostgreSQL client not initialized.');
            }

            await this.client.connect();
            
            //INSERT
            // const insertQuery = 'INSERT INTO student (name, gender) VALUES ($1,$2)';
            // const insertvalues = ['mary','female'];
            // const result: QueryResult = await this.client.query(insertQuery, insertvalues);

            // // You can handle the query result here
            // console.log('Insert result:', result);

            //DELETE
            // const deleteQuery = 'DELETE FROM student WHERE id = $1';
            // const deleteValues = [13]; // Replace with the ID
            // const deleteResult: QueryResult = await this.client.query(deleteQuery, deleteValues);
    
            // // You can handle the query result here
            // console.log('Delete result:', deleteResult);

            //UPDATE
            const updateQuery = 'UPDATE student SET name = $1, gender = $2 WHERE id = $3';
            const updateValues = ['Tony', 'male', 10]; // Replace with the new values and ID
            const updateResult: QueryResult = await this.client.query(updateQuery, updateValues);
    
            // You can handle the query result here
            console.log('Update result:', updateResult);

            // READ
            const sqlQuery = 'SELECT * FROM student'; // Replace with your actual SQL query
            const select_result: QueryResult = await this.client.query(sqlQuery);

            // You can handle the query result here
            console.log('Query result:', select_result.rows);

         

            return select_result.rows; // Return the result to the calling code
            // Execute SQL queries or perform other database operations here

        } catch (error) {
            throw error;
        }
    }
}
