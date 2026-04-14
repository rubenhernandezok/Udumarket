export default function DashboardSkeleton() {

  return (

    <div>

      {/* 🔝 CARDS */}
      <div className="row mb-4">
        {[1,2,3].map(i => (
          <div key={i} className="col-md-4">
            <div className="card p-3">
              <div className="placeholder-glow">
                <span className="placeholder col-6 mb-2"></span>
                <span className="placeholder col-8 placeholder-lg"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📊 GRAFICO */}
      <div className="card p-3 mb-4">
        <div className="placeholder-glow">
          <span className="placeholder col-4 mb-3"></span>
          <div
            className="placeholder w-100"
            style={{ height: "200px" }}
          ></div>
        </div>
      </div>

      {/* 📦 LISTAS */}
      <div className="row">

        <div className="col-md-6">
          <div className="card p-3">
            <div className="placeholder-glow">
              <span className="placeholder col-6 mb-3"></span>

              {[1,2,3,4,5].map(i => (
                <span key={i} className="placeholder col-12 mb-2"></span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <div className="placeholder-glow">
              <span className="placeholder col-6 mb-3"></span>

              {[1,2,3,4,5].map(i => (
                <span key={i} className="placeholder col-12 mb-2"></span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>

  )
}