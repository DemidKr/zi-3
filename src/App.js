import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid, InputLabel, MenuItem, Paper, Radio,
  RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  Typography
} from "@mui/material";
import React, {useState} from "react";

const accessType = { topSecret: 1, secret: 0, public: -1 };

let accessMatrix = [
  {login: 'Demid', access: accessType.topSecret,},
  {login: 'Dima', access: accessType.secret,},
  {login: 'Oleg', access: accessType.public},
  {login: 'Igor', access: accessType.secret},
  {login: 'Vlada', access: accessType.public},
  {login: 'Elena', access: accessType.topSecret},
]

let objectsToAccess = [
    accessType.public,
    accessType.secret,
    accessType.topSecret,
    accessType.secret,
    accessType.public,
    accessType.topSecret
]

function App() {
  const [login, setLogin] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  const [data, setData] = useState({})
  const [objToOperate, setObjToOperate] = useState('')
  const [taskMessage, setTaskMessage] = useState('')

  const loginHandler = () => {
    let loginName = login
    const i = accessMatrix.map(e => e.login).indexOf(loginName);
    if (i === -1) {
      setLoginError('Данный пользователь отсутствует')
      setIsAuth(false)
      setData({})
      return;
    }
    setLoginError('')
    setIsAuth(true)
    setData({...accessMatrix[i]})
  }

  const logout = () => {
    setIsAuth(false)
    setData({})
    setObjToOperate('')
  }

  function handleObjChange(event) {
    setObjToOperate(parseInt(event.target.value))
  }

  const handle = () => {
    setTaskMessage('')
      objectsToAccess[objToOperate] <= data.access
        ? setTaskMessage('Операция прошла успешно')
        : setTaskMessage('Отказ в выполнении операции. У Вас нет прав для ее осуществления')
  }

  return (
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
      >
        <Grid item lg={12}>
          <Typography component="h1" variant="h4" sx={{mb: 2}}>Защита информации</Typography>
        </Grid>
          <Grid item lg={12} sx={{mb: 2, minWidth: 300}}>
          <TextField
              id="outlined"
              sx={{mb: 2}}
              fullWidth={true}
              label="Введите ваш индентификатор"
              placeholder={login.toString()}
              onChange={e => setLogin(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{mb: 2}}>
          <Button variant="contained" color="success" onClick={loginHandler}>Войти</Button>
        </Grid>
          {isAuth &&
              <Grid item xs={6} sx={{mb: 2}}>
                <Button variant="contained" color="error" onClick={logout}>Выйти</Button>
              </Grid>}
        {loginError.length !== 0 ?
            <Grid item lg={12}>
              <Typography component="h1" variant="body1" sx={{mb: 2, color: "red"}}>{loginError}</Typography>
            </Grid> : null}
        {isAuth ?
            <div>
              <Grid item xs={6} sx={{mb: 2}}>
                  {objectsToAccess.map((el, index) => el >= data.access[index] ?
                      <Typography component="h1" variant="body1" sx={{mb: 2}}>Объект {index}</Typography>
                          : null )}
              </Grid>
                <Grid item lg={12} sx={{mb: 2, minWidth: 450}}>
                {accessMatrix.length !== 0 &&
                    <Grid item xs={6} sx={{mb: 2}}>
                      <FormControl fullWidth sx={{mb: 2}}>
                        <InputLabel id="demo-simple-select-label">Объект</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            displayEmpty
                            value={objToOperate.toString()}
                            label="Объект"
                            onChange={handleObjChange}
                        >
                          <MenuItem value={"0"}>0</MenuItem>
                          <MenuItem value={"1"}>1</MenuItem>
                          <MenuItem value={"2"}>2</MenuItem>
                          <MenuItem value={"3"}>3</MenuItem>
                          <MenuItem value={"4"}>4</MenuItem>
                            <MenuItem value={"5"}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>}
              </Grid>
              {taskMessage.length !== 0 ?
                  <Grid item lg={12}>
                    <Typography component="h1" variant="body1" sx={{mb: 2}}>{taskMessage}</Typography>
                  </Grid> : null}
            </div> : null}
        <Grid item xs={6} sx={{
          mb: 2
        }}>
          {isAuth &&
              <Button variant="contained" color="success"
                  onClick={handle}
              >
                Выполнить
              </Button>}
          </Grid>
      </Box>
  );
}

export default App;
