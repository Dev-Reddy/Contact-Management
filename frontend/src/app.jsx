import { useState } from "preact/hooks";
import "./app.css";
import ResponsiveAppBar from "./components/Navbar";
import EnhancedTable from "./components/Table";
import Container from "@mui/material/Container";

export function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container minWidth="sm">
        <EnhancedTable />
      </Container>
    </>
  );
}
