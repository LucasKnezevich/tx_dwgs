'use client'
import { React, useState } from 'react'
import { Table } from 'antd'
import { FetchQueryData } from '../api/FetchQueryData'

const SearchView = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [error, setError] = useState(false)

  const loadData = async () => {
    setNoResultsFound(false)
    setError(false)
    setLoading(true)
    try {
      const response = await FetchQueryData(query)
      setData(response)
      setLoading(false)

      // Get Column Headers
      if (response.length > 0) {
        const columnKeys = Object.keys(response[0])
        const dynamicColumns = columnKeys.map((key) => ({
          key,
          title: <b>{key}</b>,
          dataIndex: key,
          className: 'results-table-header',
          sorter: (a, b) => a[key].localeCompare(b[key])
        }))
        setColumns(dynamicColumns)
      } else {
        setNoResultsFound(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setData([])
      setLoading(false)
      setError(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loadData()
  }

  const getFirstKeyValue = (obj) => {
    const firstKey = Object.keys(obj)[0]
    const firstValue = obj[firstKey]
    return firstValue
  }

  return (
    <>
      <form className='search-form' action='' onSubmit={handleSubmit}>
        <input
          type='text'
          className='searchbar'
          onChange={text => setQuery(text.target.value)}
          placeholder='Search the database'
        />
        <button type='submit' className='btn btn-standard'>Search</button>
      </form>

      <div className="search-form-instructions">
        <p><em><b>Note:</b> Search is tightly scoped, sample queries below.</em></p>
        <div className="sample-queries">
          <p>120</p>
          <p>T130-10</p>
          <p>M-SC 3/12</p>
        </div>
      </div>

      {noResultsFound
        ? <p className='warning-text'>No Results Found</p>
        : null}

      {data.length === 0
        ? <p className='warning-text'>
            Please allow approximately one minute for the web service to start up the first time a query is run.
          </p>
        : (
            loading
              ? <span className='loader'></span>
              : <Table
                  rowKey={record => getFirstKeyValue(record)}
                  className='results-table'
                  dataSource={data}
                  columns={columns}
                  rowClassName={() => 'results-table-row'}
                  scroll={{
                    x: 1
                  }}
                  pagination={{
                    pageSizeOptions: ['10', '20', '50', '100'], // Specify the options for items per page
                    showSizeChanger: true, // Show the page size changer component
                    defaultPageSize: 10, // Set the default number of items per page
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} results` // Display the total number of results
                  }}
                />
          )
      }

      {error
        ? <p className='warning-text'>Error fetching data, please try again.</p>
        : null
      }
    </>
  )
}

export default SearchView
