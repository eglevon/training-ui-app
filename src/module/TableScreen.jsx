import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { DataTableCard2, DateTime } from 'asab_webui_components';

export function TableScreen(props) {
    const { t } = useTranslation();

    const columns = [
        {
            title: (
                <>
                    <i className='bi bi-person'></i> Username
                </>
            ),
            render: ({ row }) => (
                <Link to={`/detail/${row.id}`} title={row.id}>
                    {row.username}
                </Link>
            ),
        },
        {
            title: (
                <>
                    <i class='bi bi-envelope'></i> Email
                </>
            ),
            render: ({ row }) => <span>{row.email}</span>,
        },
        {
            title: (
                <>
                    <i class='bi bi-calendar-event'></i> Created
                </>
            ),
            render: ({ row }) => <DateTime value={row.created} />,
        },
        {
            title: (
                <>
                    <i class='bi bi-clock'></i> Last Sign In
                </>
            ),
            render: ({ row }) => <DateTime value={row.last_sign_in} />,
        },
        {
            title: (
                <>
                    <i class='bi bi-house'></i> Address
                </>
            ),
            render: ({ row }) => <span>{row.address}</span>,
        },
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
