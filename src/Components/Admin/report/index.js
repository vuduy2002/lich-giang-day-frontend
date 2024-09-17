import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import { updateEvent } from '../../../services/Admin/eventService';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { convertFromYYYYMMDD } from '../../formatDate';
import InputCheckBox from '../../checkBox';
import Button from '../../Button';

const ShowReport = () => {
    const [people, setPeople] = useState([]);

    const location = useLocation();
    const { event, currUser } = location.state;

    useEffect(() => {
        const arr = [...event.host, ...event.participants];
        arr.forEach((item) => {
            if (item.lecturerId === currUser.lecturerId) {
                item.checked = true;
            }
        });

        setPeople(arr);
    }, []);
    console.log(people);
    if (!event) {
        return <div>Loading...</div>;
    }

    const renderHosts = (arr) => {
        return arr.map((item) => `${item.lecturerName} (${item.lecturerId}), `);
    };

    const handleChange = (event, lecturerId) => {
        const { name, checked } = event.target;
        const updatedPeople = [...people];
        updatedPeople.forEach((person) => {
            if (person.lecturerId === lecturerId) {
                person[name] = checked;
            }
        });

        setPeople(updatedPeople);
    };

    const handleSubmit = async () => {
        try {
            await updateEvent(event.eventId, {
                ...event,
                host: people.filter((person) => person.isHost),
                participants: people.filter((person) => !person.isHost),
                eventType: event.eventType.typeId,
                eventLocation: event.eventLocation.locationId,
            });
            alert('Cập nhật thành công!');
            window.history.back();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <div
                style={{ cursor: 'pointer' }}
                onClick={() => window.history.back()}
            >
                <FontAwesomeIcon icon={faChevronLeft} /> Quay lại
            </div>
            <Box>
                <Typography variant="h3" gutterBottom sx={{ marginTop: 3 }}>
                    Báo Cáo Sự Kiện
                </Typography>
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                    {event.eventName}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Id:</strong> {event.eventId}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Mô tả:</strong> {event.eventDescription}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Ngày:</strong> {convertFromYYYYMMDD(event.date)}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Thời gian:</strong> {event.timeStart} -{' '}
                    {event.timeEnd}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Địa điểm:</strong>{' '}
                    {event.eventLocation?.locationName || (
                        <span style={{ color: 'red' }}>
                            'Dữ liệu đã bị chỉnh sửa hoặc xóa!'
                        </span>
                    )}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Loại sự kiện:</strong>{' '}
                    {event.eventType?.typeName || (
                        <span style={{ color: 'red' }}>
                            'Dữ liệu đã bị chỉnh sửa hoặc xóa!'
                        </span>
                    )}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Người chủ trì:</strong> {renderHosts(event.host)}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    <strong>Người Điểm danh:</strong> {renderHosts([currUser])}
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 2 }}>
                    <strong>Thành viên:</strong>
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Id
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Tên
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Vai Trò
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Tham gia
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Lý do không tham gia
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Điểm danh
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {people.map((participant) => {
                                if (
                                    participant.lecturerId !==
                                    currUser.lecturerId
                                ) {
                                    return (
                                        <TableRow key={participant.lecturerId}>
                                            <TableCell
                                                sx={{ fontSize: '1.4rem' }}
                                            >
                                                {participant.lecturerId}
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontSize: '1.4rem' }}
                                            >
                                                {participant.lecturerName}
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontSize: '1.4rem' }}
                                            >
                                                {participant.isHost
                                                    ? 'Host'
                                                    : 'Member'}
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontSize: '1.4rem' }}
                                            >
                                                {participant.confirm}
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontSize: '1.4rem' }}
                                            >
                                                {participant.reason}
                                            </TableCell>
                                            <TableCell
                                                sx={{ fontSize: '1.4rem' }}
                                            >
                                                <InputCheckBox
                                                    checked={
                                                        participant.checked
                                                    }
                                                    name={'checked'}
                                                    handleChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            participant.lecturerId,
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Button
                primary
                style={{
                    marginTop: '1rem',
                    marginLeft: 'auto',
                    display: 'block',
                }}
                onClick={() => handleSubmit()}
            >
                Lưu báo cáo
            </Button>
        </Box>
    );
};

export default ShowReport;
