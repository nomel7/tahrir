package tahrir;

import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import tahrir.tools.TrUtils;
import org.springframework.boot.SpringApplication;

import java.io.File;
import java.io.IOException;

@SpringBootApplication
public class TrMain {

	public static Logger logger = LoggerFactory.getLogger(TrMain.class);
	private static int port = 9003;

	public static void main(final String[] args) {
		final CommandLineOptions options = readCommandLineOpts(args);
		final File rootDirectory = new File(options.dir);
		if (!rootDirectory.exists()) {
			logger.info("Creating root directory {}", rootDirectory);
			if (!rootDirectory.mkdir()) {
				logger.error("Failed to create root directory {}", rootDirectory);
				System.exit(-1);
			}
		}

        try {
            SpringApplication.run(TrMain.class, args);
        } catch (Exception e) {
            throw new RuntimeException("Spring failed to launch application");
        }

        System.out.println("App launch at: http://localhost:8080/");

    }

	private static CommandLineOptions readCommandLineOpts(final String[] args) {
		final CommandLineOptions commandLineOptions = new CommandLineOptions();
		final CmdLineParser parser = new CmdLineParser(commandLineOptions);
		final StringBuffer argString = new StringBuffer();
		for (final String a : args) {
			argString.append(a);
			argString.append(' ');
		}
		logger.info("Arguments: " + argString);
		try {
			parser.parseArgument(args);
			if (commandLineOptions.help) {
				// print the list of available options
				parser.printUsage(System.out);
				System.exit(0);
			}
		} catch (final CmdLineException e) {
			System.err.println(e.getMessage());
			System.exit(-1);
		}
		return commandLineOptions;
	}

	public static class CommandLineOptions {
		public boolean help = false;
		public String dir = System.getProperty("user.home") + "/tahrir";
		public String configFile = "tahrir.json";
	}

	private static TrMainConfig readConfiguration(final File file) {
        TrMainConfig config = new TrMainConfig();
		if (file.exists()) {
			try {
				config = TrUtils.parseJson(file, TrMainConfig.class);
			} catch (final Exception e) {
				logger.error("Couldn't read configuration file: " + file, e);
				System.exit(-1);
			}
		} else { // write a new config
			try {
				TrUtils.writeJson(config, file);
			} catch (IOException e) {
				throw new RuntimeException("Couldn't create config file", e);
			}
		}

		return config;
	}

    public static class TrMainConfig {
        public boolean startGui = false;

        public TrNodeConfig node = new TrNodeConfig();
    }

    @Bean
    public TrNode trNode() throws Exception {
        // TODO create this using the new operator
        return TrUtils.TestUtils.makeNode(++port, false, false, false, true, 0, 0);
    }
}
