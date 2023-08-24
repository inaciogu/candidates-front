import { useEffect, useState } from 'react'
import './App.css'
import { Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

interface Candidate {
  id: string
  name: string
  email: string
  desiredPosition: string
}

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const get = async () => {
      const response = await fetch('https://candidates-consumer-docker.onrender.com/candidates')
      const data = await response.json()
      setCandidates(data)
      setLoading(false)
    }
    
    get()
  }, [])

  return (
    <Stack spacing={5} alignItems="center" width="100%">
      <Typography variant="h4">Candidatos em potencial</Typography>
      <TableContainer component={Card} sx={{ width: '80%', minHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                Nome
              </TableCell>
              <TableCell align="center">
                Email
              </TableCell>
              <TableCell align="center">
                Cargo desejado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && !candidates.length ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Nenhum candidato encontrado
                </TableCell>
              </TableRow>
            ) : (
              !loading ? candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell align="center">
                    {candidate.name}
                  </TableCell>
                  <TableCell align="center">
                    {candidate.email}
                  </TableCell>
                  <TableCell align="center">
                    {candidate.desiredPosition}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Carregando...
                  </TableCell>
              </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default App
