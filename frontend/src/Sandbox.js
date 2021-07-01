import React from 'react';
import {Grid, Typography, Fab, Container, CssBaseline} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const Sandbox = (listItems) => {

  return(<>
          <CssBaseline/>
          <Container>
            {/* HEADER */}
            <div>
              <Grid container justify='space-between' alignItem='center' style={{marginTop: '2rem'}}>
                <Grid item>
                  <Typography variant='h4'>ToDo List:</Typography>
                </Grid>
                <Grid item>
                  <Fab size='medium' color='primary'>
                    <AddIcon/>
                  </Fab>
                </Grid>
              </Grid>
            </div>
            {/* BODY */}
            <div>
              {console.log(listItems)}
              {/* {listItems.map((item, index) => {
                  return  <li key={index} > 
                            {item.todoitem}  
                          </li>
                  })} */}
            </div>
          </Container>
        </>);
        // <button className="btn" onClick={() => removeItem(item.id)}><i class="fa fa-trash"></i></button>
}

export default Sandbox;