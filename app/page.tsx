import { List, ListItem, Typography } from "@mui/material";

import { getActivities, getUsers } from "@/lib/api";

const SimpleList = <TItem extends { name: string }>({
  items,
}: {
  items: TItem[];
}) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.name}>{item.name}</ListItem>
      ))}
    </List>
  );
};

export default async function Home() {
  const users = await getUsers();
  const activities = await getActivities();

  return (
    <div>
      <Typography>This is index (/) page</Typography>

      <div>
        <Typography variant="h6" component="p">
          Users
        </Typography>
        <SimpleList items={users} />
      </div>

      <div>
        <Typography variant="h6" component="p">
          Activities
        </Typography>
        <SimpleList items={activities} />
      </div>
    </div>
  );
}
