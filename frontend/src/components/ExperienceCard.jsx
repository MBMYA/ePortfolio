const ExperienceCard = ({startMonth, startYear, endMonth, endYear, title, name, city, country, description}) => {
    return(
        <div class="card shadow border-0 rounded-4 mb-5">
            <div class="card-body p-5">
                <div class="row align-items-center gx-5">
                    <div class="col-12 col-lg-5 text-center text-lg-start mb-4 mb-lg-0">
                        <div class="bg-light p-4 rounded-4">
                            <div class="text-primary fw-bolder mb-2">{startMonth} {startYear} - {endMonth} {endYear}</div>
                            <div class="fw-bolder">{title}</div>
                            <div class="text-muted">{name}</div>
                            <div class="text-muted">{city}, {country}</div>
                        </div>
                    </div>
                    <div class="col-lg-7"><div>{description}</div></div>
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard