import { FormGroup, Table } from "govuk-react";

const TabularDataQuestion = () => (
  <FormGroup>
    <Table caption="Tabular data question with dummy data">
      <Table.Row>
        <Table.CellHeader>January</Table.CellHeader>
        <Table.Cell numeric>£165.00</Table.Cell>
        <Table.Cell numeric>£85.00</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.CellHeader>February</Table.CellHeader>
        <Table.Cell numeric>£165.00</Table.Cell>
        <Table.Cell numeric>£85.00</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.CellHeader>March</Table.CellHeader>
        <Table.Cell numeric>£151.00</Table.Cell>
        <Table.Cell numeric>£77.00</Table.Cell>
      </Table.Row>
    </Table>
  </FormGroup>
);

export default TabularDataQuestion;
