<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALL OF FAME</title>
    <link rel="stylesheet" href="../CSS/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
</head>

<body class="page-ranking">
    
        <?php

            // READ FILE AND LOAD PLAYER DATA

            $playersRecords = [];
            $rankingFile = fopen("../TXT/ranking225registros.txt", "r"); // load file

            if ($rankingFile) { // check if file exists

                while (!feof($rankingFile)) { // while there are lines left

                    $playerTextRecord = fgets($rankingFile); // read line

                    if (!empty($playerTextRecord)) { // Check if line is not empty

                        $playerInfoSplitted = explode(";", $playerTextRecord); // split loaded data

                        if (count($playerInfoSplitted) == 3) { // check if there are 3 elements (name + points + datetime)

                            $playersRecords[] = $playerInfoSplitted;
                        }
                    }
                }

                fclose($rankingFile);
            }

            // SORT RANKING

            usort($playersRecords, function($a, $b) {
                return $b[1] - $a[1]; // sort by points in descending order
            });


            // PAGINATION AND ECHO

            $recordCount = count($playersRecords); // Total records
            $recordsPerPage = 25; // Quantity of records per page
            $totalPages = ceil($recordCount / $recordsPerPage); // Get total pages (in case of ,X , round upward)

        
            // check current page
            $currentPage = 0;
            if (isset($_GET["page"])){

                $currentPage = $_GET["page"];

                // parameter check if currentPage is  < 1 or > $totalPages
                if ($currentPage < 1) {
                    $currentPage = 1;
                } elseif ($currentPage > $totalPages) {
                    $currentPage = $totalPages;
                }

            } else {
                $currentPage = 1;
            }

            // Get the initial index of the array based on our current page (page 1 = from 0 / page 2 = from 25 ... - included - )
            $initialIndex = ($currentPage - 1) * $recordsPerPage;

            // Get records that are gonna be shown from initial index + 25 next records
            // (all players records, initial index, get X elements (from index get 25 records))
            $playersRecordsOfTheCurrentPage = array_slice($playersRecords, $initialIndex, $recordsPerPage);

            // Get number of the player place in ranking (index of player is the initial position (index array + 1))
            $positionOfPlayerInRanking = $initialIndex + 1;
            
            // SHOW PLAYER DATA
            echo "<table>";

                // Table hader
                echo "<thead>";
                    echo "<th>POSICIÓ</th>";
                    echo "<th>NOM</th>";
                    echo "<th>PUNTUACIÓ</th>";
                    echo "<th>DATA DE REGISTRE</th>";
                echo "</thead>";
               
                // Table body
                echo "<tbody>";
                if (count($playersRecords) > 0) {

                    // Each Row
                    foreach ($playersRecordsOfTheCurrentPage as $playerRecord) {
                        echo "<tr>";
                            echo "<td>{$positionOfPlayerInRanking}</td>";
                            echo "<td>{$playerRecord[0]}</td>";
                            echo "<td>{$playerRecord[1]}</td>";
                            echo "<td>{$playerRecord[2]}</td>";
                        echo "</tr>";
                        
                        $positionOfPlayerInRanking += 1;
                    }

                } else {
                    echo "<tr>";
                        echo "<td class='empty_ranking'>No existeix cap registre! Vols ser el primer?</td>";
                    echo "</tr>";
                }

                echo "</tbody>";

            echo "</table>";
             

            // GENERATE PAGINATION IF THERE ARE MORE THAN 25 RECORDS
            if ($totalPages > 1){

                // GENERATE NUMBER SECTION
                echo "<div class='number_section'>";

                // PREVIOUS PAGE ( << )
                if ($currentPage > 1) {
                    $previousPage = $currentPage - 1;
                    echo "<a href='?page=$previousPage'>&laquo;</a> ";
                }

                // NUMBER GENERATION
                $maxShownPages = 5; // Max anchors (max. 5)
                $initialPage = max(1, $currentPage - floor($maxShownPages / 2)); // Dinamic initial paging (HIGHEST OF --> 1 or (currentPage - 2))
                $endingPage = min($totalPages, $initialPage + $maxShownPages - 1); // Dinamic initial paging (LOWEST OF --> total pages or (currentPage + 2))

                // Anchor generation
                for ($i = $initialPage; $i <= $endingPage; $i++) {
                    if ($i == $currentPage) {
                        echo "<strong>$i</strong> "; // Página actual
                    } else {
                        echo "<a href='?page=$i'>$i</a> ";
                    }
                }

                // NEXT PAGE ( >> )
                if ($currentPage < $totalPages) {
                    $nextPage = $currentPage + 1;
                    echo "<a href='?page=$nextPage'>&raquo;</a>";
                }

                echo "</div>";
            }

        ?>
</body>

</html>