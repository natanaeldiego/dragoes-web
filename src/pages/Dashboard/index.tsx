/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { deleteDragons, getDragons } from '../../services/api';
import { Dragons } from '../../services/ResponseManage';
import Form from '../Form';
import { UseToast } from '../../hooks/toast';
import { CustomStylesModal, DateFormat } from '../../utils';
import { ListData } from './listData';
import './styles.css';

function Dashboard() {

  const [resultData, setResultData] = useState<Dragons[]>([]);
  const [typePage, setTypePage] = useState<boolean>(true);
  const [dragonName, setDragonName] = useState<string>('');
  const [typeDragon, setTypeDragon] = useState<string>('');
  const [dateCreation, setDateCreation] = useState<string>('');
  const [idContent, setIdContent] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setResultData([]);
      const result = await getDragons();
      if (mounted && result !== null) {
        result.data.sort(orderData);
        setResultData(result.data);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [typePage]);

  const orderData = (a: any,b:any) => {
    if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    return 0;
  };

  const manageData = (page: boolean) => {
    switch (page) {
      case true:
        return list();
      case false:
        return <Form
          name={dragonName}
          type={typeDragon}
          date={dateCreation}
          cancelAction={cancelAction}
          typePagesAction={setTypePage}
          typePages={typePage}
          idContent={idContent}
        />;
      default:
        break;
    }
  };

  const handleSaveData = useCallback((id: number) => {
    let dataResult: Dragons | undefined;
    if (id > 0) {
      dataResult = resultData.find(data => Number(data.id) === id);
      if (dataResult !== undefined && Number(dataResult.id) > 0) {
        setIdContent(Number(dataResult.id));
        setDragonName(dataResult.name);
        setTypeDragon(dataResult.type);
        setDateCreation(DateFormat(dataResult.createdAt));
      }
    } else {
      setDragonName('');
      setTypeDragon('');
      setDateCreation('');
      setIdContent(0);
    }
    setTypePage(!typePage);
  }, [resultData, typePage]);

  const handleRemove = async (id: number) => {
    let statusResult = true;
    let message = '';
    let dataResult: Dragons | undefined;
    if (id > 0) {
      setLoading(true);
      dataResult = resultData.find(data => Number(data.id) === id);
      if (dataResult !== undefined && Number(dataResult.id) > 0) {
        try {
          const result = await deleteDragons(Number(dataResult.id));
          if (result.status === 200) {
            const data = resultData.filter(data => Number(data.id) !== id);
            setResultData(data);
            message = 'Dragão removido com sucesso!';
          } else {
            statusResult = false;
            message = 'Não foi possível remover este dragão no momento, por favor tente mais tarde!';
          }

          UseToast({
            message: message,
            type: statusResult ? 'success' : 'error'
          });

          closeModal();
          setLoading(false);
        } catch (error) {
          UseToast({
            message: 'Não foi possível realizar sua ação no momento, por favor tente novamente mais tarde!',
            type: 'error'
          });
          closeModal();
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }

  const openModal = useCallback((id: number) => {
    if (id > 0) {
      let dataResult: Dragons | undefined;
      dataResult = resultData.find(data => Number(data.id) === id);
      if (dataResult !== undefined) {
        setDragonName(dataResult.name);
        setIdContent(Number(dataResult.id));
        setIsOpen(true);
      }
    }
  }, [resultData]);

  const closeModal = useCallback(() => {
    setDragonName('');
    setIdContent(0);
    setIsOpen(false);
  }, []);

  const cancelAction = () => {
    setTypePage(!typePage);
  }

  const list = () => {
    return (
      <div className="dashboard-container">
        <div className="dashboard-main">
          <div className="dashboard-header-list">
            <h2>Todos os Dragões</h2>
            <div className="listData-btn-new">
              <Button onClick={() => handleSaveData(0)}>Criar novo dragão</Button>
            </div>
          </div>

          {resultData.length > 0 ? (
            <ListData
              resultData={resultData}
              openModal={openModal}
              handleSaveData={handleSaveData}
            />
          ) : 
            <div className="dashboard-no-results">Nenhum resultado encontrado</div>
          }
        </div>
      </div>
    );
  }

  const loadingData = () => {
    return (
      <div className="dashboard-loading" />
    );
  }

  return (
    <>
      <Header />
        {loading ? loadingData() : manageData(typePage)}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={CustomStylesModal}
        contentLabel="Remover Dragão"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <h2>Remover Dragão</h2>
          <span onClick={closeModal}>x</span>
        </div>
        <div>Tem certeza que deseja remover: <span className="modal-name-dragon">{dragonName}?</span></div>
        <div className="modal-btn-action">
          <Button onClick={closeModal}>Não</Button>
          <Button onClick={() => handleRemove(idContent)}>Sim</Button>
        </div>
      </Modal>
    </>
  );
}

export default Dashboard;
