import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { DateTime } from 'asab_webui_components';

export function DetailScreen() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                <p>Loading...</p>
            </Container>
        );
    if (error)
        return (
            <Container>
                <p>{error}</p>
            </Container>
        );

    return (
        <Container className='mt-4'>
            <Card>
                <CardBody>
                    <CardTitle tag='h5'>User Detail: {data.username}</CardTitle>
                    <CardText>
                        <strong>
                            <i className='bi bi-person'></i> Username:
                        </strong>{' '}
                        {data.username}
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-envelope'></i> Email:
                        </strong>{' '}
                        {data.email}
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-calendar-event'></i> Created:
                        </strong>{' '}
                        <DateTime value={data.created} />
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-clock'></i> Last Sign In:
                        </strong>{' '}
                        <DateTime value={data.last_sign_in} />
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-house'></i> Address:
                        </strong>{' '}
                        {data.address}
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-telephone'></i> Phone Number:
                        </strong>{' '}
                        {data.phone_number}
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-globe'></i> IP Address:
                        </strong>{' '}
                        {data.ip_address}
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-hdd-network'></i> MAC Address:
                        </strong>{' '}
                        {data.mac_address}
                    </CardText>
                    <CardText>
                        <strong>
                            <i class='bi bi-hash'></i> User ID:
                        </strong>{' '}
                        {data.id}
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    );
}
