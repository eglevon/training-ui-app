import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { DataTableCard2, DateTime } from 'asab_webui_components';

export function TableScreen(props) {
    const { t } = useTranslation();

    const columns = [
        {
            title: (
                <>
                    <i className='bi bi-person'></i> {t('User|Username')}
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
                    <i className='bi bi-envelope'></i> {t('User|Email')}
                </>
            ),
            render: ({ row }) => <span>{row.email}</span>,
        },
        {
            title: (
                <>
                    <i className='bi bi-calendar-event'></i> {t('User|Created')}
                </>
            ),
            render: ({ row }) => <DateTime value={row.created} />,
        },
        {
            title: (
                <>
                    <i className='bi bi-clock'></i> {t('User|Last Sign In')}
                </>
            ),
            render: ({ row }) => <DateTime value={row.last_sign_in} />,
        },
        {
            title: (
                <>
                    <i className='bi bi-house'></i> {t('User|Address')}
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
            <DataTableCard2 columns={columns} loader={loader} />
        </Container>
    );
}
