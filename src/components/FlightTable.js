import React, { useState, useMemo, useCallback } from "react";
import "./FlightTable.css";

const daysMap = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

const unique = (arr, key) => [
  ...new Set(arr?.map((f) => f[key]).filter(Boolean)),
];

function FlightTable({ flights, setFlights }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [loadingIdx, setLoadingIdx] = useState(null);
  const [errorIdx, setErrorIdx] = useState(null);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [aocFilter, setAocFilter] = useState("");
  const [bodyTypeFilter, setBodyTypeFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [daysFilter, setDaysFilter] = useState([]);

  const filteredFlights = useMemo(() => {
    if (!Array.isArray(flights)) return [];
    return flights.filter((f) => {
      const searchMatch =
        search === "" ||
        f.flightNumber?.toLowerCase().includes(search.toLowerCase()) ||
        f.origin?.toLowerCase().includes(search.toLowerCase()) ||
        f.destination?.toLowerCase().includes(search.toLowerCase());
      const statusMatch = statusFilter ? f.status === statusFilter : true;
      const aocMatch = aocFilter ? f.aoc === aocFilter : true;
      const bodyTypeMatch = bodyTypeFilter
        ? f.bodyType === bodyTypeFilter
        : true;
      const startMatch = startDateFilter
        ? f.startDate >= startDateFilter
        : true;
      const endMatch = endDateFilter ? f.endDate <= endDateFilter : true;
      const daysMatch = daysFilter.length
        ? daysFilter.every((d) => f.daysOfOperation?.includes(Number(d)))
        : true;
      return (
        searchMatch &&
        statusMatch &&
        aocMatch &&
        bodyTypeMatch &&
        startMatch &&
        endMatch &&
        daysMatch
      );
    });
  }, [
    flights,
    search,
    statusFilter,
    aocFilter,
    bodyTypeFilter,
    startDateFilter,
    endDateFilter,
    daysFilter,
  ]);

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditRow({ ...filteredFlights[idx] });
    setErrorIdx(null);
  };
  const handleCancel = () => {
    setEditIdx(null);
    setEditRow({});
    setErrorIdx(null);
  };
  const handleSave = (idx) => {
    setLoadingIdx(idx);
    setTimeout(() => {
      if (Math.random() < 0.15) {
        setErrorIdx(idx);
        setLoadingIdx(null);
        return;
      }
      const realIdx = flights.findIndex(
        (f) => f.id === filteredFlights[idx].id
      );
      const updated = [...flights];
      updated[realIdx] = { ...editRow };
      setFlights(updated);
      setEditIdx(null);
      setEditRow({});
      setLoadingIdx(null);
      setErrorIdx(null);
    }, 800);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };
  const handleStatusToggle = (idx) => {
    const realIdx = flights.findIndex((f) => f.id === filteredFlights[idx].id);
    const updated = [...flights];
    updated[realIdx].status =
      updated[realIdx].status === "Active" ? "Inactive" : "Active";
    setFlights(updated);
  };
  const handleSelect = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  const handleSelectAll = () => {
    if (selected.length === filteredFlights.length) setSelected([]);
    else setSelected(filteredFlights.map((_, idx) => idx));
  };
  const handleDelete = (idx) => {
    const realIdx = flights.findIndex((f) => f.id === filteredFlights[idx].id);
    setFlights(flights.filter((_, i) => i !== realIdx));
    setSelected(selected.filter((i) => i !== idx));
  };
  const handleDeleteSelected = () => {
    const idsToDelete = selected.map((idx) => filteredFlights[idx].id);
    setFlights(flights.filter((f) => !idsToDelete.includes(f.id)));
    setSelected([]);
  };

  const aocOptions = useMemo(() => unique(flights, "aoc"), [flights]);
  const bodyTypeOptions = useMemo(() => unique(flights, "bodyType"), [flights]);

  return (
    <>
      <div className="flight-table-container">
        <div className="filter-toolbar">
          <div className="filter-group search-group">
            <input
              placeholder="Search flight #, origin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={aocFilter}
              onChange={(e) => setAocFilter(e.target.value)}
            >
              <option value="">All AOC</option>
              {aocOptions.map((aoc) => (
                <option key={aoc} value={aoc}>
                  {aoc}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group date-group">
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
            <span className="date-separator">to</span>
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
            />
          </div>

          <button
            className="btn-clear"
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setAocFilter("");
              setBodyTypeFilter("");
              setStartDateFilter("");
              setEndDateFilter("");
              setDaysFilter([]);
            }}
          >
            Clear
          </button>
        </div>
        {/* Header */}
        <div className="flight-header">
          <div className="col-check">
            <input
              type="checkbox"
              checked={
                selected.length === filteredFlights.length &&
                filteredFlights.length > 0
              }
              onChange={handleSelectAll}
            />
          </div>
          <div>ID</div>
          <div>AOC</div>
          <div>Flight #</div>
          <div>Origin</div>
          <div>Dest</div>
          <div>STD</div>
          <div>STA</div>
          <div>Days</div>
          <div>Body</div>
          <div>Start</div>
          <div>End</div>
          <div>Status</div>
          <div style={{ textAlign: "right" }}>Actions</div>
        </div>

        {/* Rows */}
        <div className="flight-body">
          {filteredFlights.length === 0 ? (
            <div className="no-data">No flights found.</div>
          ) : (
            filteredFlights.map((flight, index) => {
              const isEditing = editIdx === index;
              return (
                <div
                  key={flight.id}
                  className={`flight-row ${isEditing ? "editing" : ""}`}
                >
                  <div className="col-check">
                    <input
                      type="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => handleSelect(index)}
                    />
                  </div>
                  <div className="text-secondary">{flight.id || "-"}</div>
                  <div className="badge-aoc">{flight.aoc || "-"}</div>
                  <div className="font-bold">{flight.flightNumber || "-"}</div>
                  <div>{flight.origin || "-"}</div>
                  <div>{flight.destination || "-"}</div>

                  {/* Time Columns */}
                  <div className="time-cell">
                    {isEditing ? (
                      <input
                        name="std"
                        value={editRow.std || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      flight.std || "-"
                    )}
                  </div>
                  <div className="time-cell">
                    {isEditing ? (
                      <input
                        name="sta"
                        value={editRow.sta || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      flight.sta || "-"
                    )}
                  </div>

                  <div
                    className="days-cell"
                    title={
                      flight.daysOfOperation
                        ? flight.daysOfOperation
                            .map((d) => daysMap[d])
                            .join(", ")
                        : "-"
                    }
                  >
                    {flight.daysOfOperation
                      ? flight.daysOfOperation.length > 3
                        ? flight.daysOfOperation
                            .slice(0, 3)
                            .map((d) => daysMap[d])
                            .join(", ") + "…"
                        : flight.daysOfOperation
                            .map((d) => daysMap[d])
                            .join(", ")
                      : "-"}
                  </div>

                  <div>{flight.bodyType || "-"}</div>

                  {/* Date Columns */}
                  <div className="date-cell">
                    {isEditing ? (
                      <input
                        name="startDate"
                        type="date"
                        value={editRow.startDate || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      flight.startDate || "-"
                    )}
                  </div>
                  <div className="date-cell">
                    {isEditing ? (
                      <input
                        name="endDate"
                        type="date"
                        value={editRow.endDate || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      flight.endDate || "-"
                    )}
                  </div>

                  {/* Status Column */}
                  <div>
                    {isEditing ? (
                      <select
                        name="status"
                        value={editRow.status || "Active"}
                        onChange={handleChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
                      <span
                        className={`status-badge ${flight.status?.toLowerCase()}`}
                        onClick={() => handleStatusToggle(index)}
                      >
                        {flight.status}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="actions-cell">
                    {isEditing ? (
                      <>
                        <button
                          className="btn-save"
                          onClick={() => handleSave(index)}
                          disabled={loadingIdx === index}
                        >
                          {loadingIdx === index ? "..." : "Save"}
                        </button>
                        <button className="btn-cancel" onClick={handleCancel}>
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default FlightTable;
