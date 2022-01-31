import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import Table from "../../Components/Table";
import Error from "../../Components/Error";
import Pagination from "../../Components/Pagination";
import { getTableData } from "../../Services/api";
import { configurationDataForPagination, generateTableHeader } from "../../Services/helpers/dataConfigurator";
import { TableContext } from "../../Services/context";

import "./style.css";

const LIMIT = 20
const PAGES = 100 / LIMIT


const TableView = () => {
  const context = useContext(TableContext)
  const [tableData, setTableData] = useState()
  const [currentPageData, setCurrentPageData] = useState()
  const [currentPage, setCurrentPage] = useState(false)
  const [error, setError] = useState(false)

  const splitDataForPaginator = useCallback(async () => {
    try {
      const data = await getTableData()//async service for fetch data
      setError(false)
      const splittingData = configurationDataForPagination(data, LIMIT)//using helper for split array data to multi array
      setTableData(splittingData)
      setCurrentPage(0)
    } catch (e) {
      setError('you have same error')
    }
  }, [])

  const setterCurrentData = useCallback(() => {
    if (typeof currentPage === 'number') setCurrentPageData(tableData[currentPage])//using initial value setter for updating
  }, [tableData, currentPage])

  const handleClickRequestData = () => splitDataForPaginator()

  const paginationHandler = (event, handler) => {
    event.stopPropagation()
    switch (handler) {
      case 'increment':
        return setCurrentPage(currentPage + 1)
      case 'decrement':
        return setCurrentPage((prevValue) => prevValue === 0 ? 0 : prevValue - 1)
      default:
        return;
    }
  }

  const handleBackDropClick = () => context[1]({update: -1})

  useEffect(() => {
    splitDataForPaginator()
  }, [splitDataForPaginator])

  useEffect(() => {
    setterCurrentData()
  }, [tableData, currentPage, setterCurrentData])

  return (
    <>
      <div onClick={handleBackDropClick}>
        <div className='container'>
          <div className='tableContainer'>
            {tableData && <Table headers={generateTableHeader(tableData[0][0])} tableData={currentPageData}/>}
          </div>
          <Pagination
            paginationHandler={paginationHandler}
            pages={PAGES}
            currentPage={currentPage}
          />
          {error && <Error error={error} handler={handleClickRequestData}/>}
        </div>
      </div>
    </>
  )
}

export default TableView;
