import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import useToken from "../../hooks/useToken";
import { getAllHistory } from "../../services/historyApi";
import styled from "styled-components";
import Logo from "../../assets/images/dnd.svg"
import { GiSpikedDragonHead, GiMagicAxe, GiAxeSword, GiMagicPalm } from 'react-icons/gi';

export default function History() {
    const [historyList, setHistoryList] = useState([]);
    const token = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) navigate("/sign-in?return=history");
        async function fetchData() {
            const history = await getAllHistory(token);
            setHistoryList(history);
        }
        fetchData();
    }, []);

    function renderDate(date){
        const dateObj = new Date(date);
        return dateObj.toLocaleString();
    }

    console.log(historyList);

    return (
        <>
            <Header />
            <Container>
                <SidebarContainer background={Logo}>
                    <div>
                        <SidebarList>
                            <SidebarListItem>-</SidebarListItem>
                            <SidebarListItem>Monsters <GiSpikedDragonHead /></SidebarListItem>
                            <SidebarListItem>Spells <GiMagicPalm /></SidebarListItem>
                            <SidebarListItem>Equipments <GiAxeSword /></SidebarListItem>
                            <SidebarListItem>Magic Items <GiMagicAxe /></SidebarListItem>
                        </SidebarList>
                    </div>
                </SidebarContainer>
                <Content>
                    <HistoryContainer>
                        <MainHeading>History - Showing All</MainHeading>
                        <HistoryGrid>
                            {historyList.map((history, index) => (
                                <HistoryLink
                                    key={index}
                                    to={history.type === "MONSTER" ? `/monster?index=${history.index}` :
                                     history.type === "SPELL" ? `/spell?index=${history.index}` :
                                     history.type === "EQUIPMENT" ? `/equipment?index=${history.index}` :
                                     history.type === "MAGIC_ITEM" ? `/magic-item?index=${history.index}` : ''
                                    }
                                >
                                    <HistoryName>{history.name} <HistoryDate>{renderDate(history.createdAt)}</HistoryDate></HistoryName>
                                </HistoryLink>
                            ))}
                        </HistoryGrid>
                    </HistoryContainer>
                </Content>
            </Container>
        </>
    );
}

const Container = styled.div`
      display: flex;
    `;

const SidebarContainer = styled.div`
      margin-top: 20px;
      margin-left: 20px;
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      border: 2px solid red;
      background-color: transparent;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      background-image: url(${props => props.background});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      height: fit-content;
    `;


const HistoryContainer = styled.div`
      padding: 1px 3%;
      margin-left: 10px;
    `;

const SidebarList = styled.ul`
      margin-top: 4px;
      margin-left: 4px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;

const SidebarListItem = styled.li`
      cursor: pointer;
      font-weight: bold;
      background-color: ${(props) => (props.selected ? "#E5E7EB" : "none")};
      color: ${(props) => (props.selected ? "red" : "inherit")};
    `;

const Content = styled.div`
      width: 75%;
    `;

const MainHeading = styled.h2`
  margin-top: 10px;
  margin-left: 45%;
  margin-bottom: 10px;
  color: red;
  font-size: 2xl;
  font-weight: bold;
`;

const HistoryGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    `;

const HistoryLink = styled(Link)`
      padding: 16px;
      background-color: #ccc;
      border-radius: 4px;
      text-decoration: none;
      transition: background-color 0.2s ease-in-out;
    
      &:hover {
        background-color: #8f8f8f;
      }
    `;

const HistoryName = styled.p`
      color: #333;
    `;

const HistoryDate = styled.span`
    margin-left: 30%;
    `;