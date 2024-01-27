import { List } from "@raycast/api";

type DrinkType = { id: string; name: string };

function DrinkDropdown(props: { drinkTypes: DrinkType[]; onDrinkTypeChange: (newValue: string) => void }) {
  const { drinkTypes, onDrinkTypeChange } = props;
  return (
    <List.Dropdown
      tooltip="Select Drink Type"
      storeValue={true}
      onChange={(newValue) => {
        onDrinkTypeChange(newValue);
      }}
    >
      <List.Dropdown.Section title="Alcoholic Beverages">
        {drinkTypes.map((drinkType) => (
          <List.Dropdown.Item key={drinkType.id} title={drinkType.name} value={drinkType.id} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
}

export default function Command() {
  const drinkTypes: DrinkType[] = [
    { id: "1", name: "Beer" },
    { id: "2", name: "Wine" },
  ];
  const onDrinkTypeChange = (newValue: string) => {
    console.log(newValue);
  };
  return (
    <List
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite drink"
      searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={onDrinkTypeChange} />}
    >
      <List.Item title="Augustiner Helles" />
      <List.Item title="Camden Hells" />
      <List.Item title="Leffe Blonde" />
      <List.Item title="Sierra Nevada IPA" />
    </List>
  );
}
