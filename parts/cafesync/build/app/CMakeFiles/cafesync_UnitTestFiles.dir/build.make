# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.5

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/benjamin/Projects/CafeSync/parts/cafesync/src

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/benjamin/Projects/CafeSync/parts/cafesync/build

# Utility rule file for cafesync_UnitTestFiles.

# Include the progress variables for this target.
include app/CMakeFiles/cafesync_UnitTestFiles.dir/progress.make

cafesync_UnitTestFiles: app/CMakeFiles/cafesync_UnitTestFiles.dir/build.make

.PHONY : cafesync_UnitTestFiles

# Rule to build all files generated by this target.
app/CMakeFiles/cafesync_UnitTestFiles.dir/build: cafesync_UnitTestFiles

.PHONY : app/CMakeFiles/cafesync_UnitTestFiles.dir/build

app/CMakeFiles/cafesync_UnitTestFiles.dir/clean:
	cd /home/benjamin/Projects/CafeSync/parts/cafesync/build/app && $(CMAKE_COMMAND) -P CMakeFiles/cafesync_UnitTestFiles.dir/cmake_clean.cmake
.PHONY : app/CMakeFiles/cafesync_UnitTestFiles.dir/clean

app/CMakeFiles/cafesync_UnitTestFiles.dir/depend:
	cd /home/benjamin/Projects/CafeSync/parts/cafesync/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/benjamin/Projects/CafeSync/parts/cafesync/src /home/benjamin/Projects/CafeSync/parts/cafesync/src/app /home/benjamin/Projects/CafeSync/parts/cafesync/build /home/benjamin/Projects/CafeSync/parts/cafesync/build/app /home/benjamin/Projects/CafeSync/parts/cafesync/build/app/CMakeFiles/cafesync_UnitTestFiles.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : app/CMakeFiles/cafesync_UnitTestFiles.dir/depend

