import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { TableContext } from "../../Services/context";
import { changeRowValue } from "../../Services/helpers/dataConfigurator";

import "./style.css";

const MIN_VALUE = 1
const MAX_VALUE = 1000000

const Table = ({headers, tableData}) => {
  const [data, setData] = useState(tableData)
  const [editRow, setEditRow] = useState(null)
  const [titleInputValue, setTitleInputValue] = useState(null)
  const [rowClick, setRowClick] = useState(0)

  const [context, setContext] = useContext(TableContext);

  const valueTableUpdate = useCallback((data) => {
    setData(data.map((tableObject) => changeRowValue(tableObject, MIN_VALUE, MAX_VALUE)))//using helpers for change row in all row
  }, [])

  const valueRowUpdate = useCallback((data) => {
    setData(data.map((tableObject) => {
      if (tableObject.uid === rowClick) {//using helpers for change row in all row in clicked row
        return changeRowValue(tableObject, MIN_VALUE, MAX_VALUE)
      }
      return tableObject
    }))
  }, [rowClick])

  useEffect(() => {
    if (rowClick === 0) {//uses 0 value for logic double click row
      return null
    } else {
      let timeout = setTimeout((data) => {
        valueRowUpdate(data)
      }, 2000, data)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [data, rowClick, valueRowUpdate])

  useEffect(() => {
    if (context.update === -1) {//uses -1 value for logic backdrop click
      return null
    } else {
      let timeout = setTimeout((data) => {
        setContext({
          update: !context.update
        })
        valueTableUpdate(data)
      }, 2000, data)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [data, context.update, setContext, valueTableUpdate])

  useEffect(() => {
    setData(tableData)
  }, [tableData])

  const handleDeleteRow = (event, id) => {
    event.stopPropagation()
    setData((prevValue) => prevValue.filter((tableObject) => tableObject.uid !== id))//filtering array data and remove
  }

  const handleEditRowTitle = (event, id) => {
    event.stopPropagation()
    if (typeof editRow === 'number') {
      setEditRow(false)//clear edit row
      if (titleInputValue !== null) {
        setData((prevValue) =>
          prevValue.map((tableObject) => {
            if (tableObject.uid === id) {
              return {...tableObject, title: titleInputValue} //set new title from controlled input
            }
            return tableObject
          }))
      }
    } else {//pick edit row by id
      setEditRow(id)
    }
  }

  const handleChangeRowTitle = (event) => {
    event.stopPropagation()
    const {value} = event.target
    setTitleInputValue(value)//controlled input setter
  }

  const handleTableClick = (event) => {
    event.stopPropagation()
    setContext({update: 0})
  }

  const handleRowClick = (event, id) => {
    event.stopPropagation()
    if (rowClick === id) {//if we have double on self row we starting update all table
      setRowClick(0)
      setContext({
        update: 0
      })
    } else {
      setRowClick(id)
      setContext({
        update: -1
      })
    }
  }

  return (
    <table onClick={handleTableClick} className='table'>
      <thead>
      <tr>
        {headers?.map((header) =>
          <th>{header}</th>
        )}
      </tr>
      </thead>
      <tbody>
      {data?.map((tableObject) => (
          <tr onClick={(e) => handleRowClick(e, tableObject.uid)}>
            {
              Object.entries(tableObject).map((cell) => {
                if (tableObject.uid === editRow && cell[0] === 'title') {
                  return (
                    <td>
                      <input
                        value={titleInputValue}
                        defaultValue={cell[1]}
                        onChange={(e) => handleChangeRowTitle(e)}
                        onClick={event => event.stopPropagation()}
                      />
                    </td>
                  )
                }
                return <td>{cell[1]}</td>
              })
            }

            <button
              className='button'
              onClick={(e) => handleDeleteRow(e, tableObject.uid)}
            >
              delete
            </button>
            <button
              className={editRow && tableObject.uid === editRow
                ? 'buttonActive'
                : 'button'
              }
              onClick={(e) => handleEditRowTitle(e, tableObject.uid)}
            >
              {editRow && tableObject.uid === editRow
                ? 'complete'
                : 'edit'
              }
            </button>
          </tr>
        )
      )}
      </tbody>
    </table>
  );
};

export default Table;
