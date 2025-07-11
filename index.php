<?php include_once "layout/header.php"; ?>
<link rel="stylesheet" href="source/css/styles.css">

<?php include_once "layout/navbar.php"; ?>

<div class="container mt-5 col-md-8 mb-5">

    <h3 class="text-center mb-4" style="color: #264653;">
        <i class="fas fa-chart-line me-2"></i>Ruang Server
    </h3>

    <div class="row g-4 mb-5">

        <!-- // Card for Temperature Sensor -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0">
                <div class="card-body py-4">
                    <div class="d-flex align-items-center justify-content-between">

                        <div class="d-flex align-items-center flex-grow-1">
                            <div class="sensor-icon temperature me-4">
                                <i class="fas fa-thermometer-half"></i>
                            </div>
                            <div>
                                <p class="card-title">Suhu</p>
                                <div class="sensor-value">
                                    <p><strong id="suhu" class=""></strong><strong class="unit"> °C</strong></p>
                                </div>
                            </div>
                        </div>

                        <div class="chart-container2 text-center">
                            <canvas id="pieSuhu"></canvas>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- // Card for Humidity Sensor -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0">
                <div class="card-body py-4">
                    <div class="d-flex align-items-center justify-content-between">

                        <div class="d-flex align-items-center flex-grow-1">
                            <div class="sensor-icon humidity me-4">
                                <i class="fas fa-tint"></i>
                            </div>
                            <div>
                                <p class="card-title">Kelembaban</p>
                                <div class="sensor-value">
                                    <p><strong id="kelembaban" class=""></strong><strong class="unit"> %</strong></p>
                                </div>
                            </div>
                        </div>

                        <div class="chart-container2 text-center">
                            <canvas id="pieKelembaban"></canvas>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- card untuk line chart suhu -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0">
                <div class="card-body py-4">
                    <canvas id="suhuChart"></canvas>
                </div>
            </div>
        </div>

        <!-- card untuk line chart kelembaban -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0">
                <div class="card-body py-4">
                    <canvas id="kelembabanChart"></canvas>
                </div>
            </div>
        </div>

        <!-- // Card for Timestamp -->
        <div class="col">
            <p class="timestamp">Last update: <span id="timestamp"></span></p>
        </div>

    </div>



</div>

<?php include_once "layout/footer.php"; ?>
<script src="source/js/scripts.js"></script>
