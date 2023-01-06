import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemMenu({route, text, icon}) {
    return (
        <ListItem
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            component={Link}
            to={route}
            disablePadding
        >
            <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
}
