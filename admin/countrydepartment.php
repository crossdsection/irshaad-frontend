<?php 
    include"header.php"; 
    
?>
    <body>
        <div id="wrapper">
            <!-- Navigation -->
            <?php include"leftsidebar.php";?>

            <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Add Country Ministry</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-6">
					   <form  class="country-ministry" method="POST">
					        <div class="form-group">
							    <label>County Name</label>
								<?php
								    $getCountry = $db->select("wv_countries.id,wv_countries.name","wv_countries");
								?>
								<select class="form-control" name="country_data">
								    <option value="00">Select Country</option>
									<?php
									    foreach($getCountry as $country)
										{
									?>
								           <option value="<?=$country['id']?>"><?=$country['name']?></option>
									<?php
										}
									?> 
								</select>
							</div>
							<div class="form-group">
							   <label>Ministry(Department) Name</label>
							   <input class="form-control" placeholder="Enter Ministry or department name" type="text" name="country_ministry_name">
							</div> 
							
							<div class="form-group">						
								<label>Profile Pic Head of Ministry(Department)</label>
								<input type="file" class="form-control" name="department_head_pic">
							</div>
							
								<button type="submit" class="btn btn-primary btn-md">Save</button>
								
						</form>	
                    </div>
				
                </div>
              
                <!-- /.row -->
            </div>
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->

      

        <!-- Metis Menu Plugin JavaScript -->
        <script src="assets/js/metisMenu.min.js"></script>

        <!-- Morris Charts JavaScript -->
        <script src="assets/js/raphael.min.js"></script>
       
        <!-- Custom Theme JavaScript -->
        <script src="assets/js/startmin.js"></script>
 <!-- DataTables JavaScript -->
        <script src="assets/js/dataTables/jquery.dataTables.min.js"></script>
        <script src="assets/js/dataTables/dataTables.bootstrap.min.js"></script>
		  <script>
            $(document).ready(function() {
                $('#dataTables-example').DataTable({
                        responsive: true
                });
            });
			 $(document).ready(function() {
                $('#userTable').DataTable({
                        responsive: true
                });
            });
        </script>
		<script>
		   $(document).on("submit", ".country-ministry", function(event){
			   event.preventDefault();
			   var country_name = $(this).find('select[name="country_data"]').val();
			   
			   if(country_name == '00')
			   {
				   alert("Select country name.");
				   return;
			   }
			   
			    var ministry_name = $(this).find('input[name="country_ministry_name"]').val();
			    
				if(ministry_name == '')
				{
					alert("Enter ministry name.");
					return;
				}
				
				 var formData = new FormData($(this) [0]);
				 
				 $.ajax({
					url:'../controller/DepartmentController.php?action=addDeprtment',
					type:'post',
					data:formData,
				    processData: false,
                    contentType: false,
					success:function(response)
					{
						response = JSON.parse(response);
						if(response.status == '1')
						{
							location.reload();
						}
						else
						{
							alert(response.message);
							
						}
					}
				 });
				 
		   });
		</script>
    </body>
</html>
