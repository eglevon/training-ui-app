import React from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { DataTableCard2, DateTime } from 'asab_webui_components';

export function TableScreen(props) {
    const { t } = useTranslation();

    const columns = [
        { title: 'Username', render: ({ row }) => <span>{row.username}</span> },
        { title: 'Email', render: ({ row }) => <span>{row.email}</span> },
        { title: 'Created', render: ({ row }) => <DateTime value={row.created} /> },
        { title: 'Last Sign In', render: ({ row }) => <DateTime value={row.last_sign_in} /> },
        { title: 'Address', render: ({ row }) => <span>{row.address}</span> },
    ];

    const loader = async ({ params }) => {
        const response = await axios.get('https://devtest.teskalabs.com/data', { params: params });
        const rows = response.data.data;
        const count = response.data.count;
        return { count, rows };
    };

    return (
        <Container className='h-100'>
            <DataTableCard2 columns={columns} loader={loader} header={<h1>Table</h1>} />
        </Container>
    );
}
