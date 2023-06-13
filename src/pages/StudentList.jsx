import React, { useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import StudentService from '../services/studentService'
import { toast } from 'react-toastify'

export default function StudentList() {

  const [students, setStudents] = useState([])

  useEffect(() => {
    let studentService = new StudentService()
    studentService.getStudents().then(result => setStudents(result.data))
  }, [students])

  function handleRemoveSuccess(name) {
    toast.success(`Öğrenci ${name} Silindi`)
  }

  function handleRemove(nationalId, name) {
    let studentService = new StudentService()
    studentService.removeStudent(nationalId)
      .then(handleRemoveSuccess(name))
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kimlik No</Table.HeaderCell>
            <Table.HeaderCell>İsim</Table.HeaderCell>
            <Table.HeaderCell>Telefon</Table.HeaderCell>
            <Table.HeaderCell>İlçe</Table.HeaderCell>
            <Table.HeaderCell>İl</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            students.map(student => (
              <Table.Row key={student.nationalId}>
                <Table.Cell>{student.nationalId}</Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.telephone}</Table.Cell>
                <Table.Cell>{student.townName}</Table.Cell>
                <Table.Cell>{student.townCityName}</Table.Cell>
                <Table.Cell textAlign='center'><Button onClick={() => handleRemove(student.nationalId, student.name)}>Sil</Button></Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  )
}
