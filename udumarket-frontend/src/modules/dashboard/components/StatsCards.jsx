export default function StatsCards({ stats }) {

  return (

    <div className="row">

      <div className="col-md-4">
        <div className="card p-3 shadow-sm">
          <p className="text-muted">Ventas de hoy</p>
          <h3>${stats.today_sales}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3 shadow-sm">
          <p className="text-muted">Ventas del mes</p>
          <h3>${stats.month_sales}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3 shadow-sm">
          <p className="text-muted">Ventas hoy</p>
          <h3>{stats.sales_count_today}</h3>
        </div>
      </div>

    </div>

  )

}