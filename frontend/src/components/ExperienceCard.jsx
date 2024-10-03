const ExperienceCard = ({startMonth, startYear, endMonth, endYear, title, name, city, country, description}) => {
    return(
        <div className="card shadow border-0 rounded-4 mb-5">
            <div className="card-body p-5">
                <div className="row align-items-center gx-5">
                    <div className="col-12 col-lg-5 text-center text-lg-start mb-4 mb-lg-0">
                        <div className="bg-light p-4 rounded-4">
                            <div className="text-primary fw-bolder mb-2">{startMonth} {startYear} - {endMonth} {endYear}</div>
                            <div className="fw-bolder">{title}</div>
                            <div className="text-muted">{name}</div>
                            <div className="text-muted">{city}, {country}</div>
                        </div>
                    </div>
                    <div className="col-lg-7"><div>{description}</div></div>
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard