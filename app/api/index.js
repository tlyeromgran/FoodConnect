import excuteQuery from '../../../lib/db'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req) => {
    try {
        console.log("req nom", req.body)
      const result = await excuteQuery({
          query: 'INSERT INTO post(content) VALUES(?)',
          values: [req.body.content],
      });
      console.log( "ttt",result );
  } catch ( error ) {
      console.log( error );
  }
  
  
  };
