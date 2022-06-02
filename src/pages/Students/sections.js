import React from "react";
import { useState, useEffect } from "react";
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
import SectionForm from "../../components/NavBar/SectionForm";
import AuthServices from "../../services/auth.services";

const SectionPage = () => {
  const currentUser = AuthServices.getCurrentUser();
  const currentUserRole = currentUser?.role;
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sectionCode, setSectionCode] = useState("");

  const api = axios.create({
    baseURL: `http://localhost:8080/api`,
  });

  const fetchSections = async () => {
    const response = await api.get("/sections");
    if (response) setSections(response.data);

    fetchLatestRecord();
  };
  function pad(n, length) {
    var len = length - ("" + n).length;
    return (len > 0 ? new Array(++len).join("0") : "") + n;
  }

  const fetchLatestRecord = async () => {
    const response = await api.get("/sections/latestRecord/data");
    let code = Number(response.data[0].sectionCode.slice(-3)) + 1;
    let threeDigCode = pad(code, 3);

    if (response.data.length) {
      setSectionCode(`CS-${threeDigCode}`);
    } else setSectionCode("CS-001");
  };

  const fetchSectionById = async (id) => {
    const response = await api.get(`/sections/${id}`);
    if (response.status === 200) {
      setSection(response.data);
      setUpdateDialogOpen(true);
    }
  };

  const deleteSection = async (id) => {
    const response = await api.delete(`/sections/${id}`);
    if (response.status === 200) {
      await fetchSections();
      setAlertMessage("Successfully Deleted!");
    }
    return response.data;
  };

  const createSection = async (section) => {
    const response = await api.post(`/sections/`, section);
    if (response.status === 200) {
      setAlertMessage("Successfully Created!");
      setCreateDialogOpen(false);
      await fetchSections();
      setOpenAlert(true);
    }
  };

  const updateSection = async (section) => {
    const response = await api.put(`/sections/`, section);
    if (response.status === 200) {
      setAlertMessage("Successfully Updated!");
      setUpdateDialogOpen(false);
      setOpenAlert(true);
      await fetchSections();
    } else {
    }
  };

  useEffect(() => {
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
            Add New Section
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
                  Section Name
                </TableCell>
                <TableCell sx={{ width: "100px" }} align="left">
                  Section Code
                </TableCell>
                {currentUserRole === "ADMIN" && (
                  <TableCell sx={{ width: "10px" }} align="right">
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sections?.map((section) => (
                <TableRow
                  key={section._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="section">
                    {section._id}
                  </TableCell>
                  <TableCell align="left">{section.sectionName}</TableCell>
                  <TableCell align="left">{section.sectionCode}</TableCell>
                  {currentUserRole === "ADMIN" && (
                    <TableCell
                      align="right"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => {
                            fetchSectionById(section._id);
                          }}
                          aria-label="edit"
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteSection(section._id);
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
        {/* <SectionForm handleSubmit={createSection} handleDialog={setCreateDialogOpen}  newSectionCode = {sectionCode}/> */}
        <SectionForm
          handleSubmit={createSection}
          handleDialog={setCreateDialogOpen}
          newSectionCode={sectionCode}
          heading={"Add Section"}
        />
      </Dialog>

      <Dialog
        open={updateDialogOpen}
        onClose={() => {
          setUpdateDialogOpen(false);
        }}
      >
        {section && (
          <SectionForm
            handleSubmit={updateSection}
            values={section}
            id={section._id}
            handleDialog={setUpdateDialogOpen}
            heading={"Update Section"}
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

export default SectionPage;
