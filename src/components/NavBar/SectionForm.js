import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { Button, Stack, Typography } from "@mui/material";

const SectionForm = ({ handleSubmit, values, id, handleDialog, newSectionCode, heading }) => {
  const initialValues = {
    sectionName: values ? values.sectionName : "",
    sectionCode: values ? values.sectionCode : newSectionCode,
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = () => {
    handleSubmit({ ...formValues, _id: id });
  };

  return (
    <Formik initialValues={formValues} onSubmit={submitForm}>
      {() => (
        <Form style={{ paddingTop: "20px", width: "300px", height: "300px" }}>
          <Typography variant='h5' sx={{margin: '0 0 20px 25px'}}>{heading}</Typography>
          <Stack spacing={2}>
            <TextField
              type="text"
              name="sectionName"
              label="Section Name"
              variant="outlined"
              required
              value={formValues.sectionName}
              onChange={handleChange}
              sx={{ width: "250px", alignSelf: "center" }}
            />
            <TextField
              type="text"
              name="sectionCode"
              label="Section Code"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              required
              sx={{ width: "250px", alignSelf: "center" }}
              value={formValues.sectionCode}
              onChange={handleChange}
            />
            <div style={{width:'300px' , display:'flex', justifyContent:"space-around"}}>
              <Button
                size="medium"
                variant="outlined"
                color="primary"
                onClick={()=> {
                  handleDialog(false);
                }}
                style={{
                  marginTop: "20px",
                  width: "100px",
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="primary"
                style={{
                  marginTop: "20px",
                  width: "100px",
                }}
              >
                Submit
              </Button>
            </div>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SectionForm;
