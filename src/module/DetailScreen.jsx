import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { DateTime, Spinner } from 'asab_webui_components';

export function DetailScreen() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://devtest.teskalabs.com/detail/${id}`);
                setData(response.data);
            } catch (err) {
                setError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading)
        return (
            <Container>
                <Spinner />
            </Container>
        );

    if (!data)
        return (
            <Container>
                <p>Not found.</p>
            </Container>
        );
    if (error)
        return (
            <Container>
                <p>Error: {error}</p>
            </Container>
        );

    return (
        <Container className='mt-4'>
            <div className='w-3'>
                <Button color='primary' outline className='rounded mb-2' onClick={() => navigate(-1)}>
                    <i className='bi bi-arrow-left fs-2'></i>
                </Button>
            </div>
            <Card>
                <CardBody className='pl-3'>
                    <CardTitle tag='h5' className='pb-4'>
                        {t('User|User Detail')}: {data.username}
                    </CardTitle>
                    <CardText>
                        <strong>
                            <i className='bi bi-person'></i> {t('User|Username')}:
                        </strong>{' '}
                        {data.username}
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-envelope'></i> {t('User|Email')}:
                        </strong>{' '}
                        {data.email}
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-calendar-event'></i> {t('User|Created')}:
                        </strong>{' '}
                        <DateTime value={data.created} />
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-clock'></i> {t('User|Last Sign In')}:
                        </strong>{' '}
                        <DateTime value={data.last_sign_in} />
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-house'></i> {t('User|Address')}:
                        </strong>{' '}
                        {data.address}
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-telephone'></i> {t('User|Phone Number')}:
                        </strong>{' '}
                        {data.phone_number}
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-globe'></i> {t('User|IP Address')}:
                        </strong>{' '}
                        {data.ip_address}
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-hdd-network'></i> {t('User|MAC Address')}:
                        </strong>{' '}
                        {data.mac_address}
                    </CardText>
                    <CardText>
                        <strong>
                            <i className='bi bi-hash'></i> {t('User|User ID')}:
                        </strong>{' '}
                        {data.id}
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    );
}
