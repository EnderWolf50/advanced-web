"use client";

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { useActivities } from "@/hooks/use-activites";
import { useUsers } from "@/hooks/use-users";

const SimpleList = <TItem extends { name: string }>({
  items,
}: {
  items: TItem[];
}) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.name}>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default function Home() {
  const users = useUsers();
  const activities = useActivities();

  return (
    <div>
      <Typography>This is index (/) page</Typography>

      <Divider sx={{ my: 2 }} />

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
