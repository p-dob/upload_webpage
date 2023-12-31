import os
import subprocess

class BuildWebpage:
    def pull_repository(self, repo_url, destination):
        if os.path.exists(destination):
            print("Pulling Repository")
            os.chdir(destination)
            subprocess.run('git checkout -- .', shell=True)
            subprocess.run('git pull', shell=True)
        else:
            print("Cloning Repository")
            subprocess.run(['git', 'clone', repo_url, destination])

    def build_web_application(self, directory):
        print("Starting the build process")
        os.chdir(directory)
        subprocess.run(['/home/udaydigi/.nvm/versions/node/v18.17.0/bin/npm', 'install'])
        subprocess.run(['/home/udaydigi/.nvm/versions/node/v18.17.0/bin/npm', 'run', 'build'])

    def move_built_files(self, source, destination, sudo_password):
        if os.path.exists(source):
            print("Build directory exists. Moving new build files...")
            if os.path.exists(destination):
                print("Removing existing build files...")
                sudo_cmd = f'echo {sudo_password} | sudo -S rm -rf {destination}'
                subprocess.run(sudo_cmd, shell=True)
            print("Moving new build files...")
            env = os.environ.copy()
            env['PATH'] += ':/home/udaydigi/.local/bin'  # Add the path to node executable
            command = f'echo {sudo_password} | sudo -S mv {source} {destination}'
            # subprocess.run(['echo', f'{sudo_password}', '|','sudo', '-S', 'mv', source, destination], env=env)
            subprocess.run(command, shell=True, env=env)
        else:
            print("Build directory does not exist. Check the build process for errors.")

    def restart_nginx(self):
        print("Restarting the nginx server")
        subprocess.run('sudo systemctl restart nginx', shell = True)

    def run(self):
        # Configuration
        repo_url = 'https://github.com/p-dob/upload_webpage.git'
        destination = '/home/udaydigi/upload_webpage'
        build_directory = destination
        built_files_destination = '/home/udaydigi/webpage'

        # Pull the repository
        self.pull_repository(repo_url, destination)

        # Build the web application
        self.build_web_application(build_directory)

        # Move the built files
        self.move_built_files(os.path.join(build_directory, 'build'), built_files_destination, 'a')

        # Restart Nginx
        self.restart_nginx()

    def backend_restart(self):
        command = "pkill -f '/home/udaydigi/backend/bin/python3 -u /home/udaydigi/upload_webpage_backend/app.py'"
        subprocess.run(command, shell=True)
        # command = "nohup /home/udaydigi/backend/bin/python3 -u /home/udaydigi/upload_webpage_backend/app.py | ts '[%Y-%m-%d %H:%M:%S]' | tee -a log_backend.log > /dev/null 2>&1 &"
        command = "/home/udaydigi/backend/bin/python3 -u /home/udaydigi/upload_webpage_backend/app.py"
        command = "nohup /home/udaydigi/backend/bin/gunicorn -w 4 -b 127.0.0.1:5001 app:app --access-logfile - --error-logfile - --reload 2>&1 | ts '[%Y-%m-%d %H:%M:%S]' | tee -a ~/log_backend.log"
        with open('/home/udaydigi/log_backend1.log', 'a') as log_file:
            subprocess.run(command, shell=True, stdout=log_file, stderr=subprocess.STDOUT)

    def backend_update(self):
        repo_url = 'https://github.com/p-dob/upload_webpage_backend.git'
        destination = '/home/udaydigi/upload_webpage_backend'
        # Pull the repository
        self.pull_repository(repo_url, destination)

        # Restarting the backned server
        # self.backend_restart()

if __name__ == '__main__':
        build_webpage = BuildWebpage()
        build_webpage.run()