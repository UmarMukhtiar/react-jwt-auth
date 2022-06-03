import * as React from "react";
import {
  Snackbar,
  Alert,
  Button,
  IconButton,
  Stack,
  Table,
  Dialog,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateStudentForm from "./StudentForm";
import AuthServices from "../services/auth.services";
import authHeader from "../services/auth-header";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [sections, setSections] = useState([]);
  const currentUser = AuthServices.getCurrentUser();
  const currentUserRole = currentUser?.role;

  const api = axios.create({
    baseURL: `http://localhost:8080/api`,
  });

  const fetchStudents = async () => {
    const response = await api.get("/students", { headers: authHeader() });
    setStudents(response.data.students);
    fetchLatestRecord();
  };

  const fetchLatestRecord = async () => {
    const response = await api.get("/students/latestRecord/data");
    if (response.data.length) {
      setRollNo((Number(response.data[0].rollNo) + 1).toString());
    } else setRollNo("1");
  };

  const fetchStudentById = async (id) => {
    const response = await api.get(`/students/${id}`);
    if (response.status === 200) {
      setStudent(response.data);
      setUpdateDialogOpen(true);
    }
  };

  const deleteStudent = async (id) => {
    const response = await api.delete(`/students/${id}`);
    if (response.status === 200) {
      await fetchStudents();
      setAlertMessage("Successfully Deleted!");
    }
    return response.data;
  };

  const createStudent = async (student) => {
    const response = await api.post(`/students/`, student);
    if (response.status === 200) {
      setAlertMessage("Successfully Created!");
      setCreateDialogOpen(false);
      await fetchStudents();
      setOpenAlert(true);
    }
  };

  const updateStudent = async (student) => {
    const response = await api.put(`/students/`, student);
    if (response.status === 200) {
      setAlertMessage("Successfully Updated!");
      setUpdateDialogOpen(false);
      setOpenAlert(true);
      await fetchStudents();
    }
  };

  const fetchSections = async () => {
    const response = await api.get("/sections");
    if (response) setSections(response.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchSections();
  }, []);

  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "30px auto 0 auto",
        }}
      >
        {currentUserRole === "ADMIN" && (
          <Button
            variant="contained"
            color="primary"
            sx={{ float: "right" }}
            onClick={() => {
              setCreateDialogOpen(true);
            }}
          >
            Add New Student
          </Button>
        )}
      </div>

      <div>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", display: "flex" }}
        >
          <Table
            sx={{ minWidth: 650, maxWidth: "80%", margin: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>ID</TableCell>
                <TableCell sx={{ width: "130px" }} align="left">
                  Name
                </TableCell>
                <TableCell sx={{ width: "100px" }} align="left">
                  Roll No
                </TableCell>
                <TableCell sx={{ width: "30px" }} align="left">
                  Section
                </TableCell>
                {currentUserRole === "ADMIN" && (
                  <TableCell sx={{ width: "10px" }} align="right">
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {students?.map((student) => (
                <TableRow
                  key={student._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="student">
                    {student._id}
                  </TableCell>
                  <TableCell align="left">{student.name}</TableCell>
                  <TableCell align="left">{student.rollNo}</TableCell>
                  <TableCell align="left">{student.section}</TableCell>
                  {currentUserRole === "ADMIN" && (
                    <TableCell
                      align="right"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => {
                            fetchStudentById(student._id);
                          }}
                          aria-label="edit"
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteStudent(student._id);
                            setOpenAlert(true);
                          }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        open={createDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false);
        }}
      >
        <CreateStudentForm
          handleSubmit={createStudent}
          handleDialog={setCreateDialogOpen}
          newRollNo={rollNo}
          sections={sections}
          heading={"Add Student"}
        />
      </Dialog>

      <Dialog
        open={updateDialogOpen}
        onClose={() => {
          setUpdateDialogOpen(false);
        }}
      >
        {student && (
          <CreateStudentForm
            handleSubmit={updateStudent}
            values={student}
            id={student._id}
            handleDialog={setUpdateDialogOpen}
            sections={sections}
            heading={"Update Student"}
          />
        )}
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => {
          setOpenAlert(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StudentsPage;
