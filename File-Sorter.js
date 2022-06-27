import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

//Count the number of folders present
//Print the names of the directories found
//Enter each directory and store file addresses in arrays based on key words chosen by user
//Create new directories based on user's Key word selections and arrange files into those groups

public class PrintFileNames {

	public static int counter = 0;
	public static int counter_2 = 0;
	
	public static Scanner userinput = new Scanner(System.in);	
	
	public static File[] temp_files = new java.io.File[50000];


	public static File[] searchDirectory(String dir_name) { // Function to search directory

		File d_file = new File(dir_name);

		File d_array[] = d_file.listFiles();
		
	
		Arrays.sort(d_array);
		
		for (File dir : d_array) {
		

			if (dir.isFile() && !dir.isDirectory() && !dir.equals(null)) {
				
				temp_files[counter] = dir; //Loads the arrays with file names and addresses
				temp_file_address[counter] = dir.getAbsolutePath();
				counter_2++;
				counter++;
			}

			else if (dir.isDirectory()) {
				searchDirectory(dir.getPath());
				counter_2++;
			}			
		}
		
		int i;
		String[] truefiles = new String[counter];

		for (i = 0; i < counter; i++) {
			truefiles[i] = temp_file_address[i];		
		}				
		return temp_files; //return array of file names with no nulls
	}

	public static File[] giveFileArray(String dir_name) { // Function to search directory

		File d_file2 = new File(dir_name);

		File d_array2[] = d_file2.listFiles();
		
		Arrays.sort(d_array2);
					
	return d_array2; //return array of file names with no nulls
		
	}
	
	public static File[] fillArrays(File[] file_) { //Fill File Array with specified files
		
		File[] files = new java.io.File[counter];

		int true_count = 0;
		
		int i;

		for (i = 0; i <= temp_files.length - 1; i++) {
			if (temp_files[i] != null) {
				true_count++;
			}

			if (temp_files[i] == null) {
				break;
			}
		}
	
		String[] file_address = new String[true_count];

		for (i = 0; i <= true_count - 1; i++) {
			files[i] = file_[i];
			file_address[i] = temp_file_address[i];
		}
		
		System.out.println("The number of files found is: " + counter);
	
		return files;
	}	
	
	public static String[] temp_file_address = new String[50000];
	
	public static void getFileExtension(File[] f_array) { //Find the extension of the file (Prototype)
		
		String extension = "";
		String [] ex_array = new String[counter + 1];
		
		int i = 0;
		
		for (File element : f_array) {
			
			if (element == null) {
				break;
			}
			
			int index = (element.getAbsolutePath()).lastIndexOf('.');
	        if (index > 0) {
	            extension = (element.getAbsolutePath()).substring(index + 1);
	        }
	        ex_array[i] = extension;
			
			if (ex_array[i].equals("wav")) {
				System.out.println("Wav Extension found: " + ex_array[i]); //Find wav extensions
			}
			
			else {
				System.out.println("Non-wav extension found: " + ex_array[i]); //Find non-wav extensions
			}
			i++;
		}
	}
	
	public static int keyword_Count = 0;
	
	public static File[] findKeyWordAmt(File[] filenames, String user_keyword1, String user_keyword2) {
		
		int check = 0;
		int i = 0;
		
			for (File f: filenames) {
				System.out.println(f.getName());
			}
			
			System.out.println("\n");

			for (File f: filenames) {					
						
				if (f.length() <= 0) {
					System.out.println("Null Found");
					break;
				}
	
				check = f.getAbsolutePath().indexOf(user_keyword1);
				if (check > 0) {
					keyword_Count++;
				}
								
				check = f.getAbsolutePath().indexOf(user_keyword2);
				if (check > 0) {
					keyword_Count++;
				}										
			}	
			
			System.out.println("Number of Keywords found is: " + keyword_Count);
			
			File [] key_filenames = new File[keyword_Count];
			
			for (File g: filenames) {	
				
				if (i == keyword_Count) {
					break;
				}
	
				check = g.getAbsolutePath().indexOf(user_keyword1);
				if (check > 0) {
					key_filenames[i] = g;
					i++;
				}
								
				check = g.getAbsolutePath().indexOf(user_keyword2);
				if (check > 0 && !(user_keyword2 == user_keyword1)) {
					key_filenames[i] = g;
					i++;
				}										
			}	
			
			return key_filenames;			

	}	
	
	public static File makeDirectory() { //Make the new directory
		
		System.out.println("Enter the desired Path to create a directory {Example - C:\\Users\\Admin\\Desktop\\}: ");
		
		System.out.println("MUST END WITH \\");
		
		String path = userinput.next();
		
		System.out.println("Enter the name of the desired directory: ");
		
		path = path + userinput.next();	
				
		File newDir = new File(path);
		
		boolean bool = newDir.mkdir();
		
		
		if (bool) {
			System.out.println("Success! Directory " + userinput + " created!");
		}
		
		else if (newDir.exists()){ 
			System.out.println("Directory already exists. Duplicate would result.");
		}
		
		else {
			System.out.println("Error.");
		}
		
		return newDir;
		
	}
	
	public static void moveFiles(File created_dir, File[] filenames, File [] keywords) { //Move the files from their original location to a specified directory based on Keyword or Extension
		
		int i = 0;
		
		String directory = created_dir.getPath();
		
		File[] destination = new File[keyword_Count];
		
				
		System.out.println(directory);	
		
		for (File child: keywords) {
				
			if (i == keyword_Count) {
				break;
			}
			
			else if(child == null) {
				break;
			}
			
				destination[i] = new File(created_dir.getAbsolutePath() + "\\" + keywords[i].getName());
				child.renameTo(destination[i]);
				System.out.println("Rename Successful! New Destination is: " + destination[i].getAbsolutePath());
			
				i++;
			}
	}
	
	public static void main(String[] args) {
		
		int i;

		System.out.println("Enter the address of the directory you wish to handle: ");
		
		String directory_name = userinput.nextLine();		
		
		searchDirectory(directory_name);
		
		System.out.println("Counter Value: " + counter);
		
		File[] files_total = new File[counter];
		
		getFileExtension(files_total);	
		
		System.out.println("Would you like to sort based on Extension or Keyword?");
		//System.out.println("Please type 'Yes' to sort by Extension or 'No' to sort by Keyword.");
		System.out.println("Type 'No' or 'no' to sort by Keyword.");
		
		String sel_input = userinput.nextLine();		
				
		//if (sel_input.equals("Yes") || sel_input.equals("yes")) {
			//System.out.println("Extension Selection - chosen");
			
			//moveFiles(makeDirectory(), temp_files);
		//}
		
		if (sel_input.equals("No") || sel_input.equals("no")) {
			System.out.println("Enter the Keyword you would like to search for (CASE SENSITIVE) Enter Uppercase then Lowercase: ");			
			
			String u_input = userinput.nextLine();			
			String l_input = userinput.nextLine();	
			
			if (u_input.contains(" ")) {
				u_input = u_input.replace(" ", "_");
			}
			
			if (l_input.contains(" ")) {
				l_input = l_input.replace(" ", "_");					
			}
			
			for (i = 0; i < counter; i++) {
				files_total[i] = temp_files[i];
			}
		
			fillArrays(temp_files);	
			
			findKeyWordAmt(files_total, u_input, l_input);
			
			moveFiles(makeDirectory(), files_total, findKeyWordAmt(files_total, u_input, l_input)); //Function for making the directory and moving the files into the directory from the original file
			
			System.out.println("Number of Keywords found is: " + keyword_Count);

		}
	
		userinput.close();			
	}
	
	
}

